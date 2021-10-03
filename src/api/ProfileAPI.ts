import BaseAPI from './BaseAPI';
import { UserData } from './AuthAPI.js';

export interface UpdateProfileData {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
}

export interface UpdatePasswordData {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateAvatarData {
  avatar: File;
}

export class ProfileAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  update(data: UpdateProfileData): Promise<UserData> {
    return this.http.put('/profile', data);
  }

  updateAvatar(data: UpdateAvatarData): Promise<UserData> {
    return this.http.put('/profile/avatar', data);
  }

  changePassword(data: UpdatePasswordData): Promise<void> {
    return this.http.put('/password', data);
  }

  read: undefined;
  delete: undefined;
  create: undefined;
}
