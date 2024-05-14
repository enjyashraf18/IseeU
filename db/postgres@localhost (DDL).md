classDiagram
direction BT
class AllergicDrugs {
   varchar(200) Reaction
   varchar PatientID
   varchar(100) DrugName
}
class AvailableBeds {
   serial BedID
}
class Bed {
   int ProductID
   boolean IsOccupied
   bedtype BedType
   integer BedID
}
class ChronicDiseases {
   varchar PatientID
   varchar(100) DiseaseName
}
class EmergencyContact {
   int EncounterID
   varchar(20) Relation
   varchar(20) PhoneNumber
   varchar(20) FName
   varchar(20) LName
   varchar(200) Address
   integer ContactID
}
class Employee {
   varchar(15) NID
   varchar(20) UserName
   varchar(20) Password
   varchar(20) FirstName
   varchar(20) LastName
   varchar(20) Gender
   varchar(100) EmailAddress
   varchar(100) ProfilePic
   date DateOfBirth
   varchar(20) PhoneNumber
   varchar(200) Address
   role Role
   date DateHired
   date DateLeft
   integer EmployeeID
}
class Encounters {
   varchar PatientID
   varchar(200) InformedConsent
   varchar(200) Complaint
   varchar(200) DocNotes
   int APACHE
   int GCS
   timestamp AdmitDateTime
   timestamp DischargeDateTime
   int CheckUpFreq
   int bedID
   int MorningNurseID
   int EveningNurseID
   int AdmittingDoctorID
   dep ReferralDep
   timestamp LastCheckup
   boolean CheckedUp
   encounterstate EncounterState
   dischargestate DischargeState
   int DischargeDoctorID
   integer EncounterID
}
class Equipment {
   equiptype EquipmentType
   boolean IsAvailable
   int BedID
   integer EquipmentID
}
class FamilyDisease {
   varchar PatientID
   varchar(50) Disease
}
class Investigations {
   int PatientID
   investigationtype InvType
   varchar(50) InvName
   varchar(200) Result
   timestamp InvDateTime
   int OrderedBy
   int ReviewedBy
   varchar(200) Notes
   integer InvestigationID
}
class Medications {
   int Patient
   varchar(100) Name
   varchar(50) Dosage
   int Duration
   timestamp AssignDateTime
   int FrequencyPerDay
   integer MedicationID
}
class PatientHabits {
   varchar PatientID
   varchar(50) Habit
}
class Patients {
   varchar(20) FName
   varchar(20) LName
   varchar(20) Gender
   varchar(100) Email
   varchar(100) PPic
   date BrithD
   varchar(200) Address
   varchar(15) NID
}
class PreviousSurgeries {
   date SurgeryDate
   varchar PatientID
   varchar(100) SurgeryName
}
class VitalSigns {
   int PatientID
   timestamp DateTimeRecorded
   int HeartRate
   int RespiratoryRate
   int BloodPressureSystolic
   int BloodPressureDiastolic
   int OxygenSaturation
   integer VitalSignsID
}
class users {
   varchar(128) name
   varchar(128) email
   integer id
}

AllergicDrugs  -->  Patients : PatientID:NID
ChronicDiseases  -->  Patients : PatientID:NID
EmergencyContact  -->  Encounters : EncounterID
Encounters  -->  Bed : bedID:BedID
Encounters  -->  Employee : DischargeDoctorID:EmployeeID
Encounters  -->  Employee : EveningNurseID:EmployeeID
Encounters  -->  Employee : MorningNurseID:EmployeeID
Encounters  -->  Employee : AdmittingDoctorID:EmployeeID
Encounters  -->  Patients : PatientID:NID
Equipment  -->  Bed : BedID
FamilyDisease  -->  Patients : PatientID:NID
Investigations  -->  Employee : OrderedBy:EmployeeID
Investigations  -->  Employee : ReviewedBy:EmployeeID
Investigations  -->  Encounters : PatientID:EncounterID
Medications  -->  Encounters : Patient:EncounterID
PatientHabits  -->  Patients : PatientID:NID
PreviousSurgeries  -->  Patients : PatientID:NID
VitalSigns  -->  Encounters : PatientID:EncounterID
