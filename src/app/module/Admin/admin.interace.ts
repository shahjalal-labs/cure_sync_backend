//
export type TAdminFilterRequest = {
  name?: string;
  email?: string;
  searchTerm?: string;
  contactNumber?: string;
};

export type IAdminFilterRequest = {
  name?: string | undefined;
  email?: string | undefined;
  contactNumber?: string | undefined;
  searchTerm?: string | undefined;
};
