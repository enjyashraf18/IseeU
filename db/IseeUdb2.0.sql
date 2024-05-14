CREATE TYPE ROLE AS ENUM ('Admin', 'Nurse', 'Doctor');
CREATE TYPE DEP AS ENUM ('Surgery', 'ED', 'Cardiology', 'Other');
CREATE TYPE EncounterState AS ENUM ('Admitted', 'Waiting', 'Discharged');
CREATE TYPE DischargeState AS ENUM ('Expired', 'LTACH', 'SNF', 'Home' );
CREATE TYPE BEDTYPE AS ENUM ('Standard', 'CriticalCare', 'Bariatric', 'Air Fluidized', 'Pediatric');
CREATE TYPE INVESTIGATIONTYPE AS ENUM ('Lab', 'Imaging', 'Invasive', 'Culture', 'Arterial', 'ICU');
CREATE TYPE EquipType AS ENUM ('Ventilator', 'Defibrillator','PatientMonitor');

CREATE TABLE Employee
(
    NID          VARCHAR(15) UNIQUE,                                             --National ID
    EmployeeID   SERIAL UNIQUE PRIMARY KEY,
    UserName     VARCHAR(20)  NOT NULL,
    Password     VARCHAR(20)  NOT NULL,
    FirstName    VARCHAR(20)  NOT NULL,
    LastName     VARCHAR(20),
    Gender       VARCHAR(20)  NOT NULL,
    EmailAddress VARCHAR(100) NOT NULL,
    ProfilePic   VARCHAR(100),
    DateOfBirth  DATE,
    PhoneNumber  VARCHAR(20),
    Address      VARCHAR(200),
    Role         ROLE         NOT NULL,
    DateHired    DATE,
    DateLeft     DATE,
    CONSTRAINT check_date_left CHECK (DateLeft >= DateHired OR DateLeft IS NULL) -- Ensure end date is after start date or NULL

);


CREATE TABLE Bed
(
    ProductID  INT NOT NULL,
    BedID      SERIAL PRIMARY KEY,
    IsOccupied BOOLEAN DEFAULT False,
    BedType    BEDTYPE DEFAULT 'Standard'
);

CREATE TABLE Equipment
(
    EquipmentID   SERIAL PRIMARY KEY,
    EquipmentType EquipType            NOT NULL,
    IsAvailable   BOOLEAN DEFAULT TRUE NOT NULL,                        -- Flag to indicate equipment availability
    BedID         INT                  NOT NULL REFERENCES Bed (BedID), -- Foreign key to Bed table
    UNIQUE (EquipmentType, BedID)
);

CREATE OR REPLACE FUNCTION is_bed_available(bed_id INT) RETURNS BOOLEAN AS
$$
BEGIN
    RETURN EXISTS (SELECT 1 FROM AvailableBeds WHERE bedID = bed_id);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION employee_has_role(employee_id INT, role_name VARCHAR) RETURNS BOOLEAN AS
$$
BEGIN
    RETURN EXISTS (SELECT 1 FROM Employee WHERE EmployeeID = employee_id AND Role = role_name);
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


CREATE TABLE Patients
(
    NID     VARCHAR(15) NOT NULL PRIMARY KEY, -- National ID (consider using a more secure identifier)
    FName   VARCHAR(20) NOT NULL,
    LName   VARCHAR(20),
    Gender  VARCHAR(20),
    Email   VARCHAR(100),
    PPic    VARCHAR(100),
    BrithD  DATE,
    Address VARCHAR(200)
    -- EmergencyContact can be a separate table if needed (consider one-to-many relationship)
    -- EmergencyContactID INT REFERENCES EmergencyContact(ContactID)
);

CREATE TABLE Encounters
(
    EncounterID       SERIAL UNIQUE PRIMARY KEY,
    PatientID         VARCHAR                                                                                     NOT NULL REFERENCES Patients (NID), -- Foreign key to Patients table

    InformedConsent   VARCHAR(200),

    Complaint         VARCHAR(200),
    DocNotes          VARCHAR(200),
    APACHE            INT,                                                                                                                            --  Record the Acute Physiology and Chronic Health Evaluation (APACHE)
    GCS               INT,                                                                                                                            --Include the GCS score, which assesses a patient's level of consciousness.

    AdmitDateTime     TIMESTAMP                                                                                   NOT NULL,
    DischargeDateTime TIMESTAMP,

    CheckUpFreq       INT                                                                                         NOT NULL,

    bedID             INT REFERENCES Bed (BedID) CHECK (is_bed_available(bedID)),                                                                     -- Consider a view or function for availability
    MorningNurseID    INT REFERENCES Employee (EmployeeID) CHECK (employee_has_role(MorningNurseID, 'Nurse'))     NOT NULL,
    EveningNurseID    INT REFERENCES Employee (EmployeeID) CHECK (employee_has_role(EveningNurseID, 'Nurse')),
    AdmittingDoctorID INT REFERENCES Employee (EmployeeID) CHECK (employee_has_role(AdmittingDoctorID, 'Doctor')) NOT NULL,
    ReferralDep       DEP            DEFAULT 'Other',

    LastCheckup       TIMESTAMP,
    CheckedUp         BOOLEAN        DEFAULT FALSE,

    EncounterState    EncounterState DEFAULT 'Admitted'                                                           NOT NULL,
    DischargeState    DischargeState DEFAULT 'Home',
    DischargeDoctorID INT REFERENCES Employee (EmployeeID) CHECK (employee_has_role(Encounters.DischargeDoctorID, 'Doctor'))

);

CREATE TABLE EmergencyContact
(
    ContactID   SERIAL PRIMARY KEY,
    EncounterID INT REFERENCES Encounters (EncounterID),
    Relation    VARCHAR(20),
    PhoneNumber VARCHAR(20) NOT NULL,
    FName       VARCHAR(20) NOT NULL,
    LName       VARCHAR(20),
    Address     VARCHAR(200)

);

CREATE TABLE PatientHabits
(
    PatientID VARCHAR     NOT NULL,
    Habit     VARCHAR(50) NOT NULL,
    PRIMARY KEY (PatientID, Habit),
    FOREIGN KEY (PatientID) REFERENCES Patients (NID)
);

CREATE TABLE FamilyDisease
(
    PatientID VARCHAR NOT NULL,
    Disease   VARCHAR(50),
    PRIMARY KEY (PatientID, Disease),
    FOREIGN KEY (PatientID) REFERENCES Patients (NID)
);

CREATE TABLE AllergicDrugs
(
    PatientID VARCHAR NOT NULL,
    DrugName  VARCHAR(100),
    Reaction  VARCHAR(200),
    PRIMARY KEY (PatientID, DrugName),
    FOREIGN KEY (PatientID) REFERENCES Patients (NID)
);

CREATE TABLE ChronicDiseases
(
    PatientID   VARCHAR NOT NULL,
    DiseaseName VARCHAR(100),
    PRIMARY KEY (PatientID, DiseaseName),
    FOREIGN KEY (PatientID) REFERENCES Patients (NID)
);

CREATE TABLE PreviousSurgeries
(
    PatientID   VARCHAR NOT NULL,
    SurgeryName VARCHAR(100),
    SurgeryDate DATE,
    PRIMARY KEY (PatientID, SurgeryName),
    FOREIGN KEY (PatientID) REFERENCES Patients (NID)
);

CREATE VIEW AvailableBeds AS
SELECT b.BedID
FROM Bed b
WHERE b.BedID NOT IN (SELECT p.BedID
                      FROM Encounters p
                      WHERE p.DischargeDateTime IS NOT NULL);


CREATE OR REPLACE FUNCTION is_patient_allergic(patient VARCHAR, drug_name VARCHAR) RETURNS BOOLEAN AS
$$
BEGIN
    RETURN NOT EXISTS (SELECT 1 FROM AllergicDrugs WHERE PatientID = patient AND DrugName = drug_name);
END;
$$ LANGUAGE plpgsql;

CREATE TABLE Medications
(
    Patient         INT REFERENCES Encounters (EncounterID) NOT NULL,

    MedicationID    SERIAL UNIQUE PRIMARY KEY,

    Name            VARCHAR(100)                            NOT NULL CHECK (is_patient_allergic(Patient, Name)),

    Dosage          VARCHAR(50),
    Duration        INT,
    AssignDateTime  TIMESTAMP                               NOT NULL,
    FrequencyPerDay INT -- How will we assign the frequency to the Nurse
);

CREATE TABLE Investigations
(
    InvestigationID SERIAL UNIQUE PRIMARY KEY,
    PatientID       INT REFERENCES Encounters (EncounterID)                                             NOT NULL,

    InvType         INVESTIGATIONTYPE                                                                   NOT NULL,
    InvName         VARCHAR(50)                                                                         NOT NULL, -- Type of investigation (e.g., X-ray, CT scan, blood test)
    Result          VARCHAR(200),
    InvDateTime     TIMESTAMP                                                                           NOT NULL, -- Date and time of the investigation
    OrderedBy       INT REFERENCES Employee (EmployeeID) CHECK (employee_has_role(OrderedBy, 'Doctor')) NOT NULL,
    ReviewedBy      INT REFERENCES Employee (EmployeeID) CHECK (employee_has_role(ReviewedBy, 'Doctor')),
    Notes           VARCHAR(200)

);

CREATE TABLE VitalSigns
(
    VitalSignsID           SERIAL UNIQUE                           NOT NULL PRIMARY KEY,
    PatientID              INT REFERENCES Encounters (EncounterID) NOT NULL,
    DateTimeRecorded       TIMESTAMP                               NOT NULL,
    HeartRate              INT,
    RespiratoryRate        INT,
    BloodPressureSystolic  INT,
    BloodPressureDiastolic INT,
    OxygenSaturation       INT
);

CREATE OR REPLACE FUNCTION mark_bed_occupied_on_admission()
    RETURNS TRIGGER AS
$$
BEGIN
    UPDATE Bed
    SET IsOccupied = TRUE
    WHERE BedID = NEW.bedID;

    IF NEW.bedID IS NOT NULL THEN -- Check if bed was assigned
        RETURN NEW;
    ELSE
        RAISE EXCEPTION 'No available bed found for patient.';
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER mark_bed_occupied_on_admission
    AFTER INSERT
    ON Encounters
    FOR EACH ROW
EXECUTE PROCEDURE mark_bed_occupied_on_admission();

CREATE OR REPLACE FUNCTION mark_bed_available_on_discharge()
    RETURNS TRIGGER AS
$$
BEGIN
    UPDATE Bed
    SET IsOccupied = FALSE
    WHERE BedID = OLD.bedID;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER mark_bed_available_on_discharge
    AFTER UPDATE
    ON Encounters
    FOR EACH ROW
    WHEN (OLD.DischargeDateTime IS NULL AND NEW.DischargeDateTime IS NOT NULL) -- Check for leaving date change
EXECUTE PROCEDURE mark_bed_available_on_discharge();


INSERT INTO Employee (NID, UserName, Password, FirstName, LastName, Gender, EmailAddress, ProfilePic, DateOfBirth,
                      PhoneNumber, Address, Role, DateHired, DateLeft)
VALUES ('123456789012345', 'emp1', 'password1', 'John', 'Doe', 'Male', 'john@example.com', NULL, '1990-01-01',
        '1234567890', '123 Main St', 'Admin', '2024-05-01', NULL),
       ('223456789012345', 'emp2', 'password2', 'Jane', 'Doe', 'Female', 'jane@example.com', NULL, '1991-02-02',
        '1234567891', '456 Elm St', 'Admin', '2024-05-01', NULL),
       ('323456789012345', 'emp3', 'password3', 'Mike', 'Smith', 'Male', 'mike@example.com', NULL, '1992-03-03',
        '1234567892', '789 Oak St', 'Admin', '2024-05-01', NULL),
       ('423456789012345', 'emp4', 'password4', 'Emily', 'Johnson', 'Female', 'emily@example.com', NULL, '1993-04-04',
        '1234567893', '101 Pine St', 'Admin', '2024-05-01', NULL),
       ('523456789012345', 'emp5', 'password5', 'David', 'Brown', 'Male', 'david@example.com', NULL, '1994-05-05',
        '1234567894', '202 Maple St', 'Admin', '2024-05-01', NULL);


-- Add 10 doctors
INSERT INTO Employee (NID, UserName, Password, FirstName, LastName, Gender, EmailAddress, ProfilePic, DateOfBirth,
                      PhoneNumber, Address, Role, DateHired, DateLeft)
VALUES ('100000000000000', 'doctor1', 'password', 'Doctor', 'Surname1', 'Male', 'doctor1@example.com', NULL,
        '1980-01-01', '1234567891', 'Doctor Address 1', 'Doctor', '2024-05-01', NULL),
       ('100000000000001', 'doctor2', 'password', 'Doctor', 'Surname2', 'Female', 'doctor2@example.com', NULL,
        '1980-01-02', '1234567892', 'Doctor Address 2', 'Doctor', '2024-05-01', NULL),
       ('100000000000002', 'doctor3', 'password', 'Doctor', 'Surname3', 'Male', 'doctor3@example.com', NULL,
        '1980-01-03', '1234567893', 'Doctor Address 3', 'Doctor', '2024-05-01', NULL),
       ('100000000000003', 'doctor4', 'password', 'Doctor', 'Surname4', 'Female', 'doctor4@example.com', NULL,
        '1980-01-04', '1234567894', 'Doctor Address 4', 'Doctor', '2024-05-01', NULL),
       ('100000000000004', 'doctor5', 'password', 'Doctor', 'Surname5', 'Male', 'doctor5@example.com', NULL,
        '1980-01-05', '1234567895', 'Doctor Address 5', 'Doctor', '2024-05-01', NULL),
       ('100000000000005', 'doctor6', 'password', 'Doctor', 'Surname6', 'Female', 'doctor6@example.com', NULL,
        '1980-01-06', '1234567896', 'Doctor Address 6', 'Doctor', '2024-05-01', NULL),
       ('100000000000006', 'doctor7', 'password', 'Doctor', 'Surname7', 'Male', 'doctor7@example.com', NULL,
        '1980-01-07', '1234567897', 'Doctor Address 7', 'Doctor', '2024-05-01', NULL),
       ('100000000000007', 'doctor8', 'password', 'Doctor', 'Surname8', 'Female', 'doctor8@example.com', NULL,
        '1980-01-08', '1234567898', 'Doctor Address 8', 'Doctor', '2024-05-01', NULL),
       ('100000000000008', 'doctor9', 'password', 'Doctor', 'Surname9', 'Male', 'doctor9@example.com', NULL,
        '1980-01-09', '1234567899', 'Doctor Address 9', 'Doctor', '2024-05-01', NULL),
       ('100000000000009', 'doctor10', 'password', 'Doctor', 'Surname10', 'Female', 'doctor10@example.com', NULL,
        '1980-01-10', '1234567800', 'Doctor Address 10', 'Doctor', '2024-05-01', NULL);


-- Add 20 nurses
INSERT INTO Employee (NID, UserName, Password, FirstName, LastName, Gender, EmailAddress, ProfilePic, DateOfBirth,
                      PhoneNumber, Address, Role, DateHired, DateLeft)
VALUES ('200000000000000', 'nurse1', 'password', 'Nurse', 'Surname1', 'Male', 'nurse1@example.com', NULL, '1980-01-01',
        '1234567801', 'Nurse Address 1', 'Nurse', '2024-05-01', NULL),
       ('200000000000001', 'nurse2', 'password', 'Nurse', 'Surname2', 'Female', 'nurse2@example.com', NULL,
        '1980-01-02', '1234567802', 'Nurse Address 2', 'Nurse', '2024-05-01', NULL),
       ('200000000000002', 'nurse3', 'password', 'Nurse', 'Surname3', 'Male', 'nurse3@example.com', NULL, '1980-01-03',
        '1234567803', 'Nurse Address 3', 'Nurse', '2024-05-01', NULL),
       ('200000000000003', 'nurse4', 'password', 'Nurse', 'Surname4', 'Female', 'nurse4@example.com', NULL,
        '1980-01-04', '1234567804', 'Nurse Address 4', 'Nurse', '2024-05-01', NULL),
       ('200000000000004', 'nurse5', 'password', 'Nurse', 'Surname5', 'Male', 'nurse5@example.com', NULL, '1980-01-05',
        '1234567805', 'Nurse Address 5', 'Nurse', '2024-05-01', NULL),
       ('200000000000005', 'nurse6', 'password', 'Nurse', 'Surname6', 'Female', 'nurse6@example.com', NULL,
        '1980-01-06', '1234567806', 'Nurse Address 6', 'Nurse', '2024-05-01', NULL),
       ('200000000000006', 'nurse7', 'password', 'Nurse', 'Surname7', 'Male', 'nurse7@example.com', NULL, '1980-01-07',
        '1234567807', 'Nurse Address 7', 'Nurse', '2024-05-01', NULL),
       ('200000000000007', 'nurse8', 'password', 'Nurse', 'Surname8', 'Female', 'nurse8@example.com', NULL,
        '1980-01-08', '1234567808', 'Nurse Address 8', 'Nurse', '2024-05-01', NULL),
       ('200000000000008', 'nurse9', 'password', 'Nurse', 'Surname9', 'Male', 'nurse9@example.com', NULL, '1980-01-09',
        '1234567809', 'Nurse Address 9', 'Nurse', '2024-05-01', NULL),
       ('200000000000009', 'nurse10', 'password', 'Nurse', 'Surname10', 'Female', 'nurse10@example.com', NULL,
        '1980-01-10', '1234567810', 'Nurse Address 10', 'Nurse', '2024-05-01', NULL),
       ('200000000000010', 'nurse11', 'password', 'Nurse', 'Surname11', 'Male', 'nurse11@example.com', NULL,
        '1980-01-11', '1234567811', 'Nurse Address 11', 'Nurse', '2024-05-01', NULL),
       ('200000000000011', 'nurse12', 'password', 'Nurse', 'Surname12', 'Female', 'nurse12@example.com', NULL,
        '1980-01-12', '1234567812', 'Nurse Address 12', 'Nurse', '2024-05-01', NULL),
       ('200000000000012', 'nurse13', 'password', 'Nurse', 'Surname13', 'Male', 'nurse13@example.com', NULL,
        '1980-01-13', '1234567813', 'Nurse Address 13', 'Nurse', '2024-05-01', NULL);


-- Add 12 beds with ProductID and DEFAULT for BedID
INSERT INTO Bed (ProductID, BedID, IsOccupied, BedType)
VALUES (100, DEFAULT, DEFAULT, 'Standard'),
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

