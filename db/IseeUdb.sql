CREATE TYPE ROLE AS ENUM('Admin', 'Nurse', 'Doctor');
CREATE TYPE DEP AS ENUM('Surgery', 'ED', 'Cardiology', 'Other');
CREATE TYPE EncounterState AS ENUM('Admitted', 'Waiting', 'Discharged');
CREATE TYPE DischargeState AS ENUM('Expired', 'LTACH', 'SNF', 'Home' );
CREATE TYPE BEDTYPE AS ENUM('Standard', 'CriticalCare', 'Bariatric', 'Air Fluidized', 'Pediatric');
CREATE TYPE INVESTIGATIONTYPE AS ENUM('Lab', 'Imaging', 'Invasive', 'Culture', 'Arterial', 'ICU');
CREATE TYPE EquipType AS ENUM('Ventilator', 'Defibrillator','PatientMonitor');

CREATE TABLE Admins (
    NationalID VARCHAR(15)
);

ALTER TABLE  Employee Add shift VARCHAR(20);

CREATE TABLE Reports (
    ReportID SERIAL PRIMARY KEY,
    EncounterID INT REFERENCES Encounters(EncounterID) NOT NULL ,
    Notes VARCHAR(300),
    ScansFlag BOOLEAN ,
    MedicationFlag BOOLEAN,
    ReportDoctorID INT REFERENCES Employee(EmployeeID) CHECK (employee_has_role(Reports.ReportDoctorID, 'Doctor'))


);

CREATE TABLE Employee (
    NID VARCHAR(15) UNIQUE, --National ID
    EmployeeID SERIAL UNIQUE PRIMARY KEY,
    UserName VARCHAR(20) NOT NULL ,
    Password VARCHAR(20) NOT NULL ,
    FirstName VARCHAR(20) NOT NULL,
    LastName VARCHAR(20),
    Gender VARCHAR(20) NOT NULL,
    EmailAddress VARCHAR(100) NOT NULL,
    ProfilePic VARCHAR(100),
    DateOfBirth DATE,
    PhoneNumber VARCHAR(20),
    Address VARCHAR(200),
    Role ROLE NOT NULL,
    DateHired DATE,
    DateLeft DATE,
    shift VARCHAR(20),
    CONSTRAINT check_date_left CHECK (DateLeft >= DateHired OR DateLeft IS NULL)  -- Ensure end date is after start date or NULL

);

CREATE TABLE Bed(
    ProductID INT NOT NULL ,
    BedID SERIAL PRIMARY KEY,
    IsOccupied BOOLEAN DEFAULT False,
    BedType BEDTYPE DEFAULT 'Standard'
);

CREATE TABLE Equipment(
    EquipmentID SERIAL PRIMARY KEY,
    EquipmentType EquipType NOT NULL,
    IsAvailable BOOLEAN DEFAULT TRUE NOT NULL, -- Flag to indicate equipment availability
    BedID INT NOT NULL REFERENCES Bed(BedID) ,  -- Foreign key to Bed table
    UNIQUE (EquipmentType, BedID)
);

CREATE OR REPLACE FUNCTION is_bed_available(bed_id INT) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (SELECT 1 FROM AvailableBeds WHERE bedID = bed_id);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION employee_has_role(employee_id INT, role_name VARCHAR) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (SELECT 1 FROM Employee WHERE EmployeeID = employee_id AND Role = role_name::ROLE);
END;
$$ LANGUAGE plpgsql;



-- Create different roles
    -- Data base edits: add equipments entity - add checkups freq to patients

-- Retrieve data with queries
-- Edit table to accept files / file handling: Done added patient consent and have investigations
-- Edit Columns:
    -- Done : divide patient log - added additional attributes
-- Finish the ER diagram
-- Create the workflow of the application with procedures
-- Use transactions
-- Edit medication last time
-- Edit encounter foreign key name
-- Investigation workflow and results handling

CREATE TABLE Patients (
    NID VARCHAR(15) NOT NULL PRIMARY KEY, -- National ID (consider using a more secure identifier)
    FName VARCHAR(20) NOT NULL,
    LName VARCHAR(20),
    Gender VARCHAR(20),
    Email VARCHAR(100),
    PPic VARCHAR(100),
    BrithD DATE,
    Address VARCHAR(200)
    -- EmergencyContact can be a separate table if needed (consider one-to-many relationship)
    -- EmergencyContactID INT REFERENCES EmergencyContact(ContactID)
);

CREATE TABLE Encounters (
    EncounterID SERIAL UNIQUE PRIMARY KEY,

    PatientID VARCHAR NOT NULL REFERENCES Patients(NID),  -- Foreign key to Patients table

    InformedConsent VARCHAR(200),

    Complaint VARCHAR(200),
    DocNotes VARCHAR(200),
    APACHE INT, --  Record the Acute Physiology and Chronic Health Evaluation (APACHE)
    GCS INT, --Include the GCS score, which assesses a patient's level of consciousness.

    AdmitDateTime TIMESTAMP NOT NULL,
    DischargeDateTime TIMESTAMP,

    CheckUpFreq INT NOT NULL ,

    bedID INT REFERENCES Bed(BedID) CHECK (is_bed_available(bedID)),  -- Consider a view or function for availability
    MorningNurseID INT REFERENCES Employee(EmployeeID) CHECK (employee_has_role(MorningNurseID, 'Nurse')) NOT NULL,
    EveningNurseID INT REFERENCES Employee(EmployeeID) CHECK (employee_has_role(EveningNurseID, 'Nurse')),
    AdmittingDoctorID INT REFERENCES Employee(EmployeeID) CHECK (employee_has_role(AdmittingDoctorID, 'Doctor')) NOT NULL,
    ReferralDep DEP DEFAULT 'Other',

    LastCheckup TIMESTAMP,
    CheckedUp BOOLEAN DEFAULT FALSE,

    EncounterState EncounterState DEFAULT 'Admitted' NOT NULL,
    DischargeState DischargeState DEFAULT NULL,
    DischargeDoctorID INT REFERENCES Employee(EmployeeID) CHECK (employee_has_role(Encounters.DischargeDoctorID, 'Doctor'))

);

ALTER TABLE Encounters
ALTER COLUMN DischargeState SET DEFAULT NULL;

ALTER TABLE Encounters DROP CONSTRAINT encounters_dischargedoctorid_check;

ALTER TABLE Encounters
ADD CONSTRAINT encounters_dischargedoctorid_check
CHECK (
    DischargeDoctorID IS NULL OR employee_has_role(DischargeDoctorID, 'Doctor')
);


CREATE TABLE EmergencyContact (
    ContactID SERIAL PRIMARY KEY,
    EncounterID INT REFERENCES Encounters(EncounterID),
    Relation VARCHAR(20),
    Phone VARCHAR(20) NOT NULL ,
    FName VARCHAR(20) NOT NULL,
    LName VARCHAR(20),
    Address VARCHAR(200)

);

CREATE TABLE PatientHabits (
    PatientID VARCHAR NOT NULL,
    Habit VARCHAR(50) NOT NULL,
    PRIMARY KEY (PatientID, Habit),
    FOREIGN KEY (PatientID) REFERENCES Patients(NID)
);

CREATE TABLE FamilyDisease (
    PatientID VARCHAR NOT NULL,
    Disease VARCHAR(50),
    PRIMARY KEY (PatientID, Disease),
    FOREIGN KEY (PatientID) REFERENCES Patients(NID)
);

CREATE TABLE AllergicDrugs (
    PatientID VARCHAR NOT NULL ,
    DrugName VARCHAR(100),
    Reaction VARCHAR(200),
    PRIMARY KEY (PatientID, DrugName),
    FOREIGN KEY (PatientID) REFERENCES Patients(NID)
);

CREATE TABLE ChronicDiseases (
    PatientID VARCHAR NOT NULL,
    DiseaseName VARCHAR(100),
    PRIMARY KEY (PatientID, DiseaseName),
    FOREIGN KEY (PatientID) REFERENCES Patients(NID)
);

CREATE TABLE PreviousSurgeries (
    PatientID VARCHAR NOT NULL,
    SurgeryName VARCHAR(100),
    SurgeryDate DATE,
    PRIMARY KEY (PatientID, SurgeryName),
    FOREIGN KEY (PatientID) REFERENCES Patients(NID)
);

CREATE VIEW AvailableBeds AS
    SELECT b.BedID
    FROM Bed b
    WHERE b.BedID NOT IN (
        SELECT p.BedID
        FROM Encounters p
        WHERE p.DischargeDateTime IS NOT NULL
    );

CREATE VIEW current_encounters AS
    SELECT *
        FROM encounters JOIN patients ON encounters.patientid = patients.nid
        WHERE encounters.dischargedatetime IS NULL;


CREATE OR REPLACE FUNCTION is_patient_allergic(encounter INT, drug_name VARCHAR) RETURNS BOOLEAN AS $$
BEGIN
    RETURN NOT EXISTS (SELECT 1 FROM AllergicDrugs WHERE PatientID = encounter AND DrugName = drug_name);
END;
$$ LANGUAGE plpgsql;

CREATE TABLE Medications (
    Encounter INT REFERENCES Encounters(EncounterID) NOT NULL ,

    MedicationID SERIAL UNIQUE PRIMARY KEY,

    Name VARCHAR(100) NOT NULL CHECK (is_patient_allergic(Encounter, Name)),

    Dosage VARCHAR(50),

    DoseCount INT DEFAULT 10,
    LastDoseTime TIMESTAMP,
    AssignDateTime TIMESTAMP NOT NULL,
    FrequencyPerDay INT, -- How will we assign the frequency to the Nurse
  EndDateTime TIMESTAMP GENERATED ALWAYS AS (AssignDateTime + ((DoseCount / FrequencyPerDay) * INTERVAL '1 day')) STORED
);

CREATE TABLE Investigations(
    InvestigationID SERIAL UNIQUE PRIMARY KEY,
    PatientID INT REFERENCES Encounters(EncounterID) NOT NULL ,

    InvType INVESTIGATIONTYPE NOT NULL ,
    InvName VARCHAR(50) NOT NULL,  -- Type of investigation (e.g., X-ray, CT scan, blood test)
    Result VARCHAR(200),
    InvDateTime TIMESTAMP NOT NULL,  -- Date and time of the investigation
    OrderedBy INT REFERENCES Employee(EmployeeID) CHECK (employee_has_role(OrderedBy, 'Doctor')) NOT NULL,
    ReviewedBy INT REFERENCES Employee(EmployeeID) CHECK (employee_has_role(ReviewedBy, 'Doctor')),
    Notes VARCHAR(200)

                           );

CREATE TABLE VitalSigns (
    VitalSignsID SERIAL UNIQUE NOT NULL PRIMARY KEY,
    PatientID INT REFERENCES Encounters(EncounterID) NOT NULL,
    DateTimeRecorded TIMESTAMP NOT NULL,
    HeartRate INT,
    RespiratoryRate INT,
    BloodPressureSystolic INT,
    BloodPressureDiastolic INT,
    OxygenSaturation INT
);

CREATE OR REPLACE FUNCTION mark_bed_occupied_on_admission()
    RETURNS TRIGGER AS $$
        BEGIN
          UPDATE Bed
          SET IsOccupied = TRUE
          WHERE BedID = NEW.bedID;

          IF NEW.bedID IS NOT NULL THEN  -- Check if bed was assigned
            RETURN NEW;
          ELSE
            RAISE EXCEPTION 'No available bed found for patient.';
          END IF;
        END;
    $$ LANGUAGE plpgsql;

CREATE TRIGGER mark_bed_occupied_on_admission
    AFTER INSERT ON Encounters
    FOR EACH ROW
    EXECUTE PROCEDURE mark_bed_occupied_on_admission();

CREATE OR REPLACE FUNCTION mark_bed_available_on_discharge()
    RETURNS TRIGGER AS $$
        BEGIN
          UPDATE Bed
          SET IsOccupied = FALSE
          WHERE BedID = OLD.bedID;

          RETURN NEW;
        END;
    $$ LANGUAGE plpgsql;

CREATE TRIGGER mark_bed_available_on_discharge
    AFTER UPDATE ON Encounters
    FOR EACH ROW
    WHEN (OLD.DischargeDateTime IS NULL AND NEW.DischargeDateTime IS NOT NULL)  -- Check for leaving date change
    EXECUTE PROCEDURE mark_bed_available_on_discharge();


INSERT INTO Employee (NID, UserName, Password, FirstName, LastName, Gender, EmailAddress, ProfilePic, DateOfBirth, PhoneNumber, Address, Role, DateHired, DateLeft, Shift)
VALUES
-- Doctors
('D001', 'johnsmith', 'pass1234', 'John', 'Smith', 'Male', 'john.smith@hospital.com', 'profile1.jpg', '1979-03-15', '123-456-7890', '123 Main St, City', 'Doctor', '2010-05-20', NULL, 'Day'),
('D002', 'emmabrown', 'pass1234', 'Emma', 'Brown', 'Female', 'emma.brown@hospital.com', 'profile2.jpg', '1986-07-22', '123-456-7891', '456 Elm St, City', 'Doctor', '2012-08-13', NULL, 'Night'),
('D003', 'rajpatel', 'pass1234', 'Raj', 'Patel', 'Male', 'raj.patel@hospital.com', 'profile3.jpg', '1974-11-30', '123-456-7892', '789 Oak St, City', 'Doctor', '2008-01-30', NULL, 'Day'),
('D004', 'lindachen', 'pass1234', 'Linda', 'Chen', 'Female', 'linda.chen@hospital.com', 'profile4.jpg', '1982-04-25', '123-456-7893', '101 Pine St, City', 'Doctor', '2011-06-15', NULL, 'Day'),
('D005', 'michaellee', 'pass1234', 'Michael', 'Lee', 'Male', 'michael.lee@hospital.com', 'profile5.jpg', '1977-09-12', '123-456-7894', '202 Birch St, City', 'Doctor', '2009-11-05', NULL, 'Night'),

-- Admins
('A001', 'alicejohnson', 'pass1234', 'Alice', 'Johnson', 'Female', 'alice.johnson@hospital.com', 'profile6.jpg', '1989-02-18', '234-567-8901', '303 Cedar St, City', 'Admin', '2015-03-25', NULL, 'Day'),
('A002', 'robertwilliams', 'pass1234', 'Robert', 'Williams', 'Male', 'robert.williams@hospital.com', 'profile7.jpg', '1984-05-30', '234-567-8902', '404 Spruce St, City', 'Admin', '2013-07-19', NULL, 'Day'),
('A003', 'marydavis', 'pass1234', 'Mary', 'Davis', 'Female', 'mary.davis@hospital.com', 'profile8.jpg', '1993-11-10', '234-567-8903', '505 Maple St, City', 'Admin', '2018-02-05', NULL, 'Night'),
('A004', 'jameswilson', 'pass1234', 'James', 'Wilson', 'Male', 'james.wilson@hospital.com', 'profile9.jpg', '1978-12-20', '234-567-8904', '606 Fir St, City', 'Admin', '2010-09-17', NULL, 'Day'),
('A005', 'patriciataylor', 'pass1234', 'Patricia', 'Taylor', 'Female', 'patricia.taylor@hospital.com', 'profile10.jpg', '1995-08-15', '234-567-8905', '707 Ash St, City', 'Admin', '2020-04-10', NULL, 'Night'),

-- Nurses
('N001', 'davidmoore', 'pass1234', 'David', 'Moore', 'Male', 'david.moore@hospital.com', 'profile11.jpg', '1985-06-28', '345-678-9012', '808 Cherry St, City', 'Nurse', '2014-10-01', NULL, 'Day'),
('N002', 'sarahrichards', 'pass1234', 'Sarah', 'Richards', 'Female', 'sarah.richards@hospital.com', 'profile12.jpg', '1990-01-17', '345-678-9013', '909 Walnut St, City', 'Nurse', '2016-12-14', NULL, 'Night'),
('N003', 'chrisallen', 'pass1234', 'Chris', 'Allen', 'Male', 'chris.allen@hospital.com', 'profile13.jpg', '1987-03-09', '345-678-9014', '1010 Chestnut St, City', 'Nurse', '2015-11-08', NULL, 'Day'),
('N004', 'jessicaturner', 'pass1234', 'Jessica', 'Turner', 'Female', 'jessica.turner@hospital.com', 'profile14.jpg', '1992-09-21', '345-678-9015', '1111 Hickory St, City', 'Nurse', '2017-03-22', NULL, 'Night'),
('N005', 'michaelwalker', 'pass1234', 'Michael', 'Walker', 'Male', 'michael.walker@hospital.com', 'profile15.jpg', '1983-07-15', '345-678-9016', '1212 Magnolia St, City', 'Nurse', '2012-05-10', NULL, 'Day'),
('N006', 'lisaroberts', 'pass1234', 'Lisa', 'Roberts', 'Female', 'lisa.roberts@hospital.com', 'profile16.jpg', '1988-10-05', '345-678-9017', '1313 Willow St, City', 'Nurse', '2015-09-15', NULL, 'Day'),
('N007', 'stevenking', 'pass1234', 'Steven', 'King', 'Male', 'steven.king@hospital.com', 'profile17.jpg', '1991-12-11', '345-678-9018', '1414 Sycamore St, City', 'Nurse', '2016-08-20', NULL, 'Night'),
('N008', 'karenmartin', 'pass1234', 'Karen', 'Martin', 'Female', 'karen.martin@hospital.com', 'profile18.jpg', '1984-04-02', '345-678-9019', '1515 Cypress St, City', 'Nurse', '2013-06-11', NULL, 'Day'),
('N009', 'danielgarcia', 'pass1234', 'Daniel', 'Garcia', 'Male', 'daniel.garcia@hospital.com', 'profile19.jpg', '1986-08-29', '345-678-9020', '1616 Cedar St, City', 'Nurse', '2011-07-14', NULL, 'Day'),
('N010', 'amandathomas', 'pass1234', 'Amanda', 'Thomas', 'Female', 'amanda.thomas@hospital.com', 'profile20.jpg', '1994-05-06', '345-678-9021', '1717 Redwood St, City', 'Nurse', '2019-10-03', NULL, 'Night');


-- Add 10 doctors
INSERT INTO Patients (NID, FName, LName, Gender, Email, PPic, BrithD, Address)
VALUES
('P001', 'John', 'Doe', 'Male', 'john.doe@example.com', 'profile1.jpg', '1980-01-15', '123 Main St, City'),
('P002', 'Jane', 'Smith', 'Female', 'jane.smith@example.com', 'profile2.jpg', '1990-02-20', '456 Elm St, City'),
('P003', 'Michael', 'Johnson', 'Male', 'michael.johnson@example.com', 'profile3.jpg', '1975-03-10', '789 Oak St, City'),
('P004', 'Emily', 'Williams', 'Female', 'emily.williams@example.com', 'profile4.jpg', '1985-04-25', '101 Pine St, City'),
('P005', 'Daniel', 'Brown', 'Male', 'daniel.brown@example.com', 'profile5.jpg', '1995-05-30', '202 Birch St, City'),
('P006', 'Sophia', 'Jones', 'Female', 'sophia.jones@example.com', 'profile6.jpg', '1988-06-15', '303 Cedar St, City'),
('P007', 'James', 'Garcia', 'Male', 'james.garcia@example.com', 'profile7.jpg', '1978-07-10', '404 Spruce St, City'),
('P008', 'Ava', 'Miller', 'Female', 'ava.miller@example.com', 'profile8.jpg', '1983-08-05', '505 Maple St, City'),
('P009', 'Christopher', 'Davis', 'Male', 'christopher.davis@example.com', 'profile9.jpg', '1982-09-20', '606 Fir St, City'),
('P010', 'Olivia', 'Martinez', 'Female', 'olivia.martinez@example.com', 'profile10.jpg', '1992-10-10', '707 Ash St, City'),
('P011', 'Matthew', 'Hernandez', 'Male', 'matthew.hernandez@example.com', 'profile11.jpg', '1979-11-05', '808 Cherry St, City'),
('P012', 'Isabella', 'Lopez', 'Female', 'isabella.lopez@example.com', 'profile12.jpg', '1994-12-25', '909 Walnut St, City'),
('P013', 'David', 'Gonzalez', 'Male', 'david.gonzalez@example.com', 'profile13.jpg', '1981-01-30', '1010 Chestnut St, City'),
('P014', 'Mia', 'Wilson', 'Female', 'mia.wilson@example.com', 'profile14.jpg', '1993-02-14', '1111 Hickory St, City'),
('P015', 'Joseph', 'Anderson', 'Male', 'joseph.anderson@example.com', 'profile15.jpg', '1977-03-23', '1212 Magnolia St, City'),
('P016', 'Amelia', 'Thomas', 'Female', 'amelia.thomas@example.com', 'profile16.jpg', '1991-04-17', '1313 Willow St, City'),
('P017', 'William', 'Taylor', 'Male', 'william.taylor@example.com', 'profile17.jpg', '1984-05-12', '1414 Sycamore St, City'),
('P018', 'Evelyn', 'Moore', 'Female', 'evelyn.moore@example.com', 'profile18.jpg', '1996-06-07', '1515 Cypress St, City'),
('P019', 'Alexander', 'Jackson', 'Male', 'alexander.jackson@example.com', 'profile19.jpg', '1976-07-18', '1616 Cedar St, City'),
('P020', 'Sofia', 'White', 'Female', 'sofia.white@example.com', 'profile20.jpg', '1987-08-22', '1717 Redwood St, City');


INSERT INTO Encounters (PatientID, InformedConsent, Complaint, DocNotes, APACHE, GCS, AdmitDateTime, DischargeDateTime, bedID, MorningNurseID, EveningNurseID, AdmittingDoctorID, ReferralDep, LastCheckup, CheckedUp, EncounterState, DischargeState, DischargeDoctorID)
VALUES
('P001', 'Yes', 'Chest pain', 'Possible heart attack', 15, 9, '2024-01-01 08:00:00', NULL, 1, 82, 84, 72, 'Cardiology', '2024-01-05 08:00:00', TRUE, 'Admitted', NULL, NULL),
-- Encounter 2
('P002', 'Yes', 'Headache', 'Migraine', 5, 15, '2024-01-02 09:00:00', NULL, 2, 83, 84, 72, 'Cardiology', '2024-01-03 09:00:00', TRUE, 'Admitted', NULL, NULL),
-- Encounter 3
('P003', 'Yes', 'Abdominal pain', 'Appendicitis', 8, 12, '2024-01-03 10:00:00', NULL, 3, 82, 84, 72, 'Surgery', '2024-01-07 10:00:00', TRUE, 'Admitted', NULL, NULL),
-- Encounter 4
('P004', 'Yes', 'Fever', 'Infection', 10, 11, '2024-01-04 11:00:00', NULL, 4, 83, 84, 72, 'ED', '2024-01-06 07:00:00', TRUE, 'Admitted', NULL, NULL),
-- Encounter 5
('P005', 'Yes', 'Cough', 'Pneumonia', 12, 10, '2024-01-05 12:00:00', NULL, 5, 82, 84, 72, 'Cardiology', '2024-01-10 12:00:00', TRUE, 'Admitted', NULL, NULL),
-- Encounter 6
('P006', 'Yes', 'Leg pain', 'Fracture', 6, 14, '2024-01-06 13:00:00', NULL, 6, 83, 84, 72, 'ED', '2024-01-09 13:00:00', TRUE, 'Admitted', NULL, NULL),
-- Encounter 7
('P007', 'Yes', 'Shortness of breath', 'Asthma', 7, 13, '2024-01-07 14:00:00', NULL, 7, 82, 84, 72, 'ED', '2024-01-11 14:00:00', TRUE, 'Admitted', NULL, NULL),
-- Encounter 8
('P008', 'Yes', 'Back pain', 'Herniated disc', 9, 12, '2024-01-08 15:00:00', NULL, 8, 82, 84, 72, 'Other', '2024-01-12 15:00:00', TRUE, 'Admitted', NULL, NULL),
-- Encounter 9
('P009', 'Yes', 'Dizziness', 'Vertigo', 8, 13, '2024-01-09 16:00:00', NULL, 9, 83, 84, 72, 'Other', '2024-01-13 16:00:00', TRUE, 'Admitted', NULL, NULL),
-- Encounter 10
('P010', 'Yes', 'Joint pain', 'Arthritis', 7, 12, '2024-01-10 17:00:00', NULL, 10, 83, 84, 72, 'Surgery', '2024-01-14 17:00:00', TRUE, 'Admitted', NULL, NULL),
-- Encounter 11
('P011', 'Yes', 'Nausea', 'Gastroenteritis', 5, 14, '2024-01-11 18:00:00', NULL, 11, 82, 84, 72, 'ED', '2024-01-15 18:00:00', TRUE, 'Admitted', NULL, NULL),
-- Encounter 12
('P012', 'Yes', 'Ear pain', 'Ear infection', 6, 13, '2024-01-12 19:00:00', '2024-01-16 21:00:00', 12, 83, 84, 72, 'Surgery', '2024-01-16 19:00:00', TRUE, 'Discharged', 'Home', 72),
-- Encounter 13
('P013', 'Yes', 'Sore throat', 'Tonsillitis', 7, 12, '2024-01-13 20:00:00', '2024-01-17 22:00:00', 13, 82, 84, 72, 'Surgery', '2024-01-17 20:00:00', TRUE, 'Discharged', 'Home', 72),
-- Encounter 14
('P014', 'Yes', 'Burn', 'Second degree burn', 8, 11, '2024-01-14 21:00:00', '2024-01-18 23:00:00', 14, 82, 84, 72, 'ED', '2024-01-18 21:00:00', TRUE, 'Discharged', 'Home', 72),
-- Encounter 15
('P015', 'Yes', 'Swelling', 'Allergic reaction', 9, 10, '2024-01-15 22:00:00', '2024-01-19 00:00:00', 15, 82, 84, 72, 'Surgery', '2024-01-19 22:00:00', TRUE, 'Discharged', 'Home', 72),
-- Encounter 16
('P016', 'Yes', 'Fainting', 'Syncope', 5, 9, '2024-01-16 23:00:00', '2024-01-20 01:00:00', 16, 83, 84, 72, 'Cardiology', '2024-01-20 23:00:00', TRUE, 'Discharged', 'Home', 72),
-- Encounter 17
('P017', 'Yes', 'Fatigue', 'Anemia', 6, 14, '2024-01-17 00:00:00', '2024-01-21 02:00:00', 17, 82, 84, 72, 'Cardiology', '2024-01-21 00:00:00', TRUE, 'Discharged', 'Home', 72),
-- Encounter 18
('P018', 'Yes', 'Rash', 'Dermatitis', 7, 13, '2024-01-18 01:00:00', '2024-01-22 03:00:00', 18, 83, 84, 72, 'Cardiology', '2024-01-22 01:00:00', TRUE, 'Discharged', 'Home', 72),
-- Encounter 19
('P019', 'Yes', 'Vomiting', 'Food poisoning', 8, 12, '2024-01-19 02:00:00', '2024-01-23 04:00:00', 19, 82, 84, 72, 'ED', '2024-01-23 02:00:00', TRUE, 'Discharged', 'Home', 72),
-- Encounter 20
('P020', 'Yes', 'Numbness', 'Neuropathy', 9, 11, '2024-01-20 03:00:00', '2024-01-24 05:00:00', 20, 83, 84, 72, 'Cardiology', '2024-01-24 03:00:00', TRUE, 'Discharged', 'Home', 72);


INSERT INTO Bed (ProductID, IsOccupied, BedType)
VALUES
(1001, FALSE, 'Standard'),
(1002, TRUE, 'CriticalCare'),
(1003, FALSE, 'Bariatric'),
(1004, TRUE, 'Air Fluidized'),
(1005, FALSE, 'Pediatric'),
(1006, TRUE, 'Standard'),
(1007, FALSE, 'CriticalCare'),
(1008, TRUE, 'Bariatric'),
(1009, FALSE, 'Air Fluidized'),
(1010, TRUE, 'Pediatric'),
(1011, FALSE, 'Standard'),
(1012, TRUE, 'CriticalCare'),
(1013, FALSE, 'Bariatric'),
(1014, TRUE, 'Air Fluidized'),
(1015, FALSE, 'Pediatric'),
(1016, TRUE, 'Standard'),
(1017, FALSE, 'CriticalCare'),
(1018, TRUE, 'Bariatric'),
(1019, FALSE, 'Air Fluidized'),
(1020, TRUE, 'Pediatric');

INSERT INTO Equipment (EquipmentType, IsAvailable, BedID)
VALUES
('PatientMonitor', TRUE, 1),
('Ventilator', FALSE, 2),
('Defibrillator', TRUE, 3),
('PatientMonitor', FALSE, 4),
('Ventilator', TRUE, 5),
('Defibrillator', FALSE, 6),
('PatientMonitor', TRUE, 7),
('Ventilator', FALSE, 8),
('Defibrillator', TRUE, 9),
('PatientMonitor', FALSE, 10),
('Ventilator', TRUE, 11),
('Defibrillator', FALSE, 12),
('PatientMonitor', TRUE, 13),
('Ventilator', FALSE, 14),
('Defibrillator', TRUE, 15),
('PatientMonitor', FALSE, 16),
('Ventilator', TRUE, 17),
('Defibrillator', FALSE, 18),
('PatientMonitor', TRUE, 19),
('Ventilator', FALSE, 20);
;




-- Add 12 beds with ProductID and DEFAULT for BedID
INSERT INTO Bed (ProductID, BedID, IsOccupied, BedType)
VALUES
    (100, DEFAULT, DEFAULT, 'Standard'),
    (101, DEFAULT, DEFAULT, 'Standard'),
    (102, DEFAULT, DEFAULT, 'Standard'),
    (103, DEFAULT, DEFAULT, 'CriticalCare'),
    (104, DEFAULT, DEFAULT, 'CriticalCare'),
    (105, DEFAULT, DEFAULT, 'CriticalCare'),
    (106, DEFAULT, DEFAULT, 'Bariatric'),
    (107, DEFAULT, DEFAULT, 'Bariatric'),
    (108, DEFAULT, DEFAULT, 'Air Fluidized'),
    (109, DEFAULT, DEFAULT, 'Air Fluidized'),
    (110, DEFAULT, DEFAULT, 'Pediatric'),
    (111, DEFAULT, DEFAULT, 'Pediatric');

SELECT *
        FROM encounters JOIN patients ON encounters.patientid = patients.nid
        WHERE encounters.dischargedatetime IS NULL

SELECT * FROM employee_2
        WHERE employee_2.dateleft IS NULL AND (employee_2.Role= 'Doctor'::ROLE OR employee_2.Role= 'Nurse'::ROLE );