import { ProfileAPI, UpdateAvatarData, UpdateProfileData, UpdatePasswordData } from '../api/ProfileAPI';
import { store } from '../store';
import { setUser } from '../store/user';
import { setResponse } from '../store/profile';

class ProfileController {
  private api: ProfileAPI;

  constructor() {
    this.api = new ProfileAPI();
  }

  async update(data: UpdateProfileData) {
    try {
      const user = await this.api.update(data);
      store.dispatch(setUser(user));
      store.dispatch(setResponse({ success: 'Успешно обновлено' }));
    } catch (e) {
      store.dispatch(setResponse({ error: (e as { reason: string }).reason }));
    }
  }

  async updateAvatar(data: UpdateAvatarData) {
    try {
      const user = await this.api.updateAvatar(data);
      store.dispatch(setUser(user));
      store.dispatch(setResponse({ success: 'Успешно обновлено' }));
    } catch (e) {
      store.dispatch(setResponse({ error: (e as { reason: string }).reason }));
    }
  }

  async changePassword(data: UpdatePasswordData) {
    try {
      await this.api.changePassword(data);
      store.dispatch(setResponse({ success: 'Успешно обновлено' }));
    } catch (e) {
      store.dispatch(setResponse({ error: (e as { reason: string }).reason }));
    }
  }
}

export default new ProfileController();
