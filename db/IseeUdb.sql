CREATE TYPE ROLE AS ENUM('Admin', 'Nurse', 'Doctor');
CREATE TYPE DEP AS ENUM('Surgery', 'ED', 'Cardiology', 'Other');
CREATE TYPE BEDTYPE AS ENUM('Standard', 'CriticalCare', 'Bariatric', 'Air Fluidized', 'Pediatric');
CREATE TYPE INVESTIGATIONTYPE AS ENUM('Lab', 'Imaging', 'Invasive', 'Culture', 'Arterial', 'ICU');


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
    CONSTRAINT check_date_left CHECK (DateLeft >= DateHired OR DateLeft IS NULL)  -- Ensure end date is after start date or NULL

);


CREATE TABLE Bed(
    ProductID INT NOT NULL ,
    BedID SERIAL PRIMARY KEY,
    IsOccupied BOOLEAN DEFAULT False,
    BedType BEDTYPE DEFAULT 'Standard'
);

CREATE OR REPLACE FUNCTION is_bed_available(bed_id INT) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (SELECT 1 FROM AvailableBeds WHERE bedID = bed_id);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION employee_has_role(employee_id INT, role_name VARCHAR) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (SELECT 1 FROM Employee WHERE EmployeeID = employee_id AND Role = role_name);
END;
$$ LANGUAGE plpgsql;
CREATE TABLE PatientLog (
    NID VARCHAR(15) NOT NULL , --National ID
    LogID SERIAL UNIQUE PRIMARY KEY,
    FirstName VARCHAR(20) NOT NULL,
    LastName VARCHAR(20),
    Gender VARCHAR(20),
    EmailAddress VARCHAR(100),
    ProfilePic VARCHAR(100),
    DateOfBirth DATE,
    Address VARCHAR(200),

--EmergencyContact INT REFERENCES EmergencyContact(ContactID) NOT NULL,

    Complaint VARCHAR(200),
    DocNotes VARCHAR(200),

    AdmitDateTime TIMESTAMP NOT NULL,
    LeaveDateTime TIMESTAMP ,
    bedID INT REFERENCES Bed(BedID) CHECK (is_bed_available(bedID)        ),
    MorningNurseID INT REFERENCES Employee(EmployeeID) CHECK (employee_has_role(MorningNurseID, 'Nurse')) NOT NULL,
    EveningNurseID INT REFERENCES Employee(EmployeeID) CHECK (employee_has_role(EveningNurseID, 'Nurse')),
    AdmittingDoctorID INT REFERENCES Employee(EmployeeID) CHECK (employee_has_role(AdmittingDoctorID, 'Doctor')) NOT NULL,
    ReferralDep DEP DEFAULT 'Other'
);


CREATE TABLE EmergencyContact (
    ContactID SERIAL PRIMARY KEY,
    PatientID INT REFERENCES PatientLog(LogID),
    Relationship VARCHAR(20),
    PhoneNumber VARCHAR(20) NOT NULL ,
    FirstName VARCHAR(20) NOT NULL,
    LastName VARCHAR(20),
    Address VARCHAR(200)

);

CREATE TABLE PatientHabits (
    LogID INT NOT NULL,
    Habit VARCHAR(50) NOT NULL,
    PRIMARY KEY (LogID, Habit),
    FOREIGN KEY (LogID) REFERENCES PatientLog(LogID)
);

CREATE TABLE FamilyDisease (
    LogID INT NOT NULL,
    Disease VARCHAR(50),
    PRIMARY KEY (LogID, Disease),
    FOREIGN KEY (LogID) REFERENCES PatientLog(LogID)
);

CREATE TABLE AllergicDrugs (
    LogID INT NOT NULL ,
    DrugName VARCHAR(100),
    Reaction VARCHAR(200),
    PRIMARY KEY (LogID, DrugName),
    FOREIGN KEY (LogID) REFERENCES PatientLog(LogID)
);

CREATE TABLE ChronicDiseases (
    LogID INT NOT NULL,
    DiseaseName VARCHAR(100),
    PRIMARY KEY (LogID, DiseaseName),
    FOREIGN KEY (LogID) REFERENCES PatientLog(LogID)
);

CREATE TABLE PreviousSurgeries (
    LogID INT NOT NULL,
    SurgeryName VARCHAR(100),
    SurgeryDate DATE,
    PRIMARY KEY (LogID, SurgeryName),
    FOREIGN KEY (LogID) REFERENCES PatientLog(LogID)
);

CREATE VIEW AvailableBeds AS
    SELECT b.BedID
    FROM Bed b
    WHERE b.BedID NOT IN (
        SELECT p.BedID
        FROM PatientLog p
        WHERE p.LeaveDateTime IS NOT NULL
    );


CREATE OR REPLACE FUNCTION is_patient_allergic(log_id INT, drug_name VARCHAR) RETURNS BOOLEAN AS $$
BEGIN
    RETURN NOT EXISTS (SELECT 1 FROM AllergicDrugs WHERE LogID = log_id AND DrugName = drug_name);
END;
$$ LANGUAGE plpgsql;

CREATE TABLE Medications (
    Patient INT REFERENCES PatientLog(LogID) NOT NULL ,

    MedicationID SERIAL UNIQUE PRIMARY KEY,

    Name VARCHAR(100) NOT NULL CHECK (is_patient_allergic(Patient, Name)),

    Dosage VARCHAR(50),
    Duration INT,
    AssignDateTime TIMESTAMP NOT NULL,
    FrequencyPerDay INT -- How will we assign the frequency to the Nurse
);

CREATE TABLE Investigations(
    InvestigationID SERIAL UNIQUE PRIMARY KEY,
    PatientID INT REFERENCES PatientLog(LogID) NOT NULL ,

    InvType INVESTIGATIONTYPE NOT NULL ,
    InvName VARCHAR(50) NOT NULL,  -- Type of investigation (e.g., X-ray, CT scan, blood test)
    Result VARCHAR(200),
    InvDateTime TIMESTAMP NOT NULL,  -- Date and time of the investigation
    OrderedBy INT REFERENCES Employee(EmployeeID) CHECK (employee_has_role(OrderedBy, 'Doctor')) NOT NULL,
    ReviewedBy INT REFERENCES Employee(EmployeeID) CHECK (employee_has_role(ReviewedBy, 'Doctor'))
                           );



CREATE TABLE VitalSigns (
    VitalSignsID SERIAL UNIQUE NOT NULL PRIMARY KEY,
    PatientID INT REFERENCES PatientLog(LogID) NOT NULL,
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
    AFTER INSERT ON PatientLog
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
    AFTER UPDATE ON PatientLog
    FOR EACH ROW
    WHEN (OLD.LeaveDateTime IS NULL AND NEW.LeaveDateTime IS NOT NULL)  -- Check for leaving date change
    EXECUTE PROCEDURE mark_bed_available_on_discharge();


INSERT INTO Employee (NID, UserName, Password, FirstName, LastName, Gender, EmailAddress, ProfilePic, DateOfBirth, PhoneNumber, Address, Role, DateHired, DateLeft)
VALUES
    ('123456789012345', 'emp1', 'password1', 'John', 'Doe', 'Male', 'john@example.com', NULL, '1990-01-01', '1234567890', '123 Main St', 'Admin', '2024-05-01', NULL),
    ('223456789012345', 'emp2', 'password2', 'Jane', 'Doe', 'Female', 'jane@example.com', NULL, '1991-02-02', '1234567891', '456 Elm St', 'Admin', '2024-05-01', NULL),
    ('323456789012345', 'emp3', 'password3', 'Mike', 'Smith', 'Male', 'mike@example.com', NULL, '1992-03-03', '1234567892', '789 Oak St', 'Admin', '2024-05-01', NULL),
    ('423456789012345', 'emp4', 'password4', 'Emily', 'Johnson', 'Female', 'emily@example.com', NULL, '1993-04-04', '1234567893', '101 Pine St', 'Admin', '2024-05-01', NULL),
    ('523456789012345', 'emp5', 'password5', 'David', 'Brown', 'Male', 'david@example.com', NULL, '1994-05-05', '1234567894', '202 Maple St', 'Admin', '2024-05-01', NULL);


-- Add 10 doctors
INSERT INTO Employee (NID, UserName, Password, FirstName, LastName, Gender, EmailAddress, ProfilePic, DateOfBirth, PhoneNumber, Address, Role, DateHired, DateLeft)
VALUES
    ('100000000000000', 'doctor1', 'password', 'Doctor', 'Surname1', 'Male', 'doctor1@example.com', NULL, '1980-01-01', '1234567891', 'Doctor Address 1', 'Doctor', '2024-05-01', NULL),
    ('100000000000001', 'doctor2', 'password', 'Doctor', 'Surname2', 'Female', 'doctor2@example.com', NULL, '1980-01-02', '1234567892', 'Doctor Address 2', 'Doctor', '2024-05-01', NULL),
    ('100000000000002', 'doctor3', 'password', 'Doctor', 'Surname3', 'Male', 'doctor3@example.com', NULL, '1980-01-03', '1234567893', 'Doctor Address 3', 'Doctor', '2024-05-01', NULL),
    ('100000000000003', 'doctor4', 'password', 'Doctor', 'Surname4', 'Female', 'doctor4@example.com', NULL, '1980-01-04', '1234567894', 'Doctor Address 4', 'Doctor', '2024-05-01', NULL),
    ('100000000000004', 'doctor5', 'password', 'Doctor', 'Surname5', 'Male', 'doctor5@example.com', NULL, '1980-01-05', '1234567895', 'Doctor Address 5', 'Doctor', '2024-05-01', NULL),
    ('100000000000005', 'doctor6', 'password', 'Doctor', 'Surname6', 'Female', 'doctor6@example.com', NULL, '1980-01-06', '1234567896', 'Doctor Address 6', 'Doctor', '2024-05-01', NULL),
    ('100000000000006', 'doctor7', 'password', 'Doctor', 'Surname7', 'Male', 'doctor7@example.com', NULL, '1980-01-07', '1234567897', 'Doctor Address 7', 'Doctor', '2024-05-01', NULL),
    ('100000000000007', 'doctor8', 'password', 'Doctor', 'Surname8', 'Female', 'doctor8@example.com', NULL, '1980-01-08', '1234567898', 'Doctor Address 8', 'Doctor', '2024-05-01', NULL),
    ('100000000000008', 'doctor9', 'password', 'Doctor', 'Surname9', 'Male', 'doctor9@example.com', NULL, '1980-01-09', '1234567899', 'Doctor Address 9', 'Doctor', '2024-05-01', NULL),
    ('100000000000009', 'doctor10', 'password', 'Doctor', 'Surname10', 'Female', 'doctor10@example.com', NULL, '1980-01-10', '1234567800', 'Doctor Address 10', 'Doctor', '2024-05-01', NULL);


-- Add 20 nurses
INSERT INTO Employee (NID, UserName, Password, FirstName, LastName, Gender, EmailAddress, ProfilePic, DateOfBirth, PhoneNumber, Address, Role, DateHired, DateLeft)
VALUES
    ('200000000000000', 'nurse1', 'password', 'Nurse', 'Surname1', 'Male', 'nurse1@example.com', NULL, '1980-01-01', '1234567801', 'Nurse Address 1', 'Nurse', '2024-05-01', NULL),
    ('200000000000001', 'nurse2', 'password', 'Nurse', 'Surname2', 'Female', 'nurse2@example.com', NULL, '1980-01-02', '1234567802', 'Nurse Address 2', 'Nurse', '2024-05-01', NULL),
    ('200000000000002', 'nurse3', 'password', 'Nurse', 'Surname3', 'Male', 'nurse3@example.com', NULL, '1980-01-03', '1234567803', 'Nurse Address 3', 'Nurse', '2024-05-01', NULL),
    ('200000000000003', 'nurse4', 'password', 'Nurse', 'Surname4', 'Female', 'nurse4@example.com', NULL, '1980-01-04', '1234567804', 'Nurse Address 4', 'Nurse', '2024-05-01', NULL),
    ('200000000000004', 'nurse5', 'password', 'Nurse', 'Surname5', 'Male', 'nurse5@example.com', NULL, '1980-01-05', '1234567805', 'Nurse Address 5', 'Nurse', '2024-05-01', NULL),
    ('200000000000005', 'nurse6', 'password', 'Nurse', 'Surname6', 'Female', 'nurse6@example.com', NULL, '1980-01-06', '1234567806', 'Nurse Address 6', 'Nurse', '2024-05-01', NULL),
    ('200000000000006', 'nurse7', 'password', 'Nurse', 'Surname7', 'Male', 'nurse7@example.com', NULL, '1980-01-07', '1234567807', 'Nurse Address 7', 'Nurse', '2024-05-01', NULL),
    ('200000000000007', 'nurse8', 'password', 'Nurse', 'Surname8', 'Female', 'nurse8@example.com', NULL, '1980-01-08', '1234567808', 'Nurse Address 8', 'Nurse', '2024-05-01', NULL),
    ('200000000000008', 'nurse9', 'password', 'Nurse', 'Surname9', 'Male', 'nurse9@example.com', NULL, '1980-01-09', '1234567809', 'Nurse Address 9', 'Nurse', '2024-05-01', NULL),
    ('200000000000009', 'nurse10', 'password', 'Nurse', 'Surname10', 'Female', 'nurse10@example.com', NULL, '1980-01-10', '1234567810', 'Nurse Address 10', 'Nurse', '2024-05-01', NULL),
    ('200000000000010', 'nurse11', 'password', 'Nurse', 'Surname11', 'Male', 'nurse11@example.com', NULL, '1980-01-11', '1234567811', 'Nurse Address 11', 'Nurse', '2024-05-01', NULL),
    ('200000000000011', 'nurse12', 'password', 'Nurse', 'Surname12', 'Female', 'nurse12@example.com', NULL, '1980-01-12', '1234567812', 'Nurse Address 12', 'Nurse', '2024-05-01', NULL),
    ('200000000000012', 'nurse13', 'password', 'Nurse', 'Surname13', 'Male', 'nurse13@example.com', NULL, '1980-01-13', '1234567813', 'Nurse Address 13', 'Nurse', '2024-05-01', NULL);



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

-- Add 10 patients
INSERT INTO PatientLog (
    NID,
    FirstName,
    LastName,
    Gender,
    EmailAddress,
    ProfilePic,
    DateOfBirth,
    Address,
    Complaint,
    DocNotes,
    AdmitDateTime,
    bedID,
    MorningNurseID,
    EveningNurseID,
    AdmittingDoctorID
)
VALUES
    ('11111111111111', 'John', 'Doe', 'Male', 'john@example.com', NULL, '1980-01-01', '123 Main St', 'Fever', 'Needs rest', '2024-05-01 08:00:00', 1, 1, 2, 3),
    ('22222222222222', 'Jane', 'Smith', 'Female', 'jane@example.com', NULL, '1985-02-15', '456 Elm St', 'Cough', 'Prescribed antibiotics', '2024-05-02 10:00:00', 2, 4, 5, 6),
    ('33333333333333', 'Michael', 'Johnson', 'Male', 'michael@example.com', NULL, '1976-07-20', '789 Oak St', 'Headache', 'Suggested rest and hydration', '2024-05-03 12:00:00', 3, 7, 8, 9),
    ('44444444444444', 'Emily', 'Brown', 'Female', 'emily@example.com', NULL, '1990-11-10', '101 Pine St', 'Abdominal pain', 'Referred for further examination', '2024-05-04 14:00:00', 4, 10, 11, 12),
    ('55555555555555', 'David', 'Wilson', 'Male', 'david@example.com', NULL, '1982-03-25', '202 Cedar St', 'Nausea', 'Advised to rest and avoid heavy meals', '2024-05-05 16:00:00', 5, 1, 2, 3),
    ('66666666666666', 'Emma', 'Martinez', 'Female', 'emma@example.com', NULL, '1988-09-12', '303 Maple St', 'Sore throat', 'Prescribed throat lozenges', '2024-05-06 18:00:00', 6, 4, 5, 6),
    ('77777777777777', 'William', 'Taylor', 'Male', 'william@example.com', NULL, '1975-05-30', '404 Walnut St', 'Back pain', 'Suggested physical therapy', '2024-05-07 20:00:00', 7, 7, 8, 9),
    ('88888888888888', 'Olivia', 'Anderson', 'Female', 'olivia@example.com', NULL, '1995-12-05', '505 Birch St', 'Fatigue', 'Advised to improve sleep habits', '2024-05-08 22:00:00', 8, 10, 11, 12),
    ('99999999999999', 'James', 'Garcia', 'Male', 'james@example.com', NULL, '1984-08-18', '606 Spruce St', 'Dizziness', 'Recommended hydration and rest', '2024-05-09 00:00:00', 9, 1, 2, 3),
    ('12345678901234', 'Sophia', 'Lopez', 'Female', 'sophia@example.com', NULL, '1986-06-07', '707 Pineapple St', 'Fainting', 'Further evaluation scheduled', '2024-05-10 02:00:00', 10, 4, 5, 6);
