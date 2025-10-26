//
export type IDoctorUpdate = {
  name: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: "MALE" | "FEMALE";
  apointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  specialties: "string";
};

export type ISpecialities = {
  specialitiesId: string;
  isDeleted?: null;
};
