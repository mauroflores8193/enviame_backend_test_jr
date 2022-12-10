const User = require('../entities/user');

class ManageUsersUsecase {

  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async getUsers() {
    return await this.usersRepository.getUsers();
  }

  async getUser(id) {
    return await this.usersRepository.getUser(id);
  }

  async createUser(data) {
    const user = new User(undefined, data.name, data.email, data.password, data.is_admin);
    const id = await this.usersRepository.createUser(user);
    user.id = id;
    return user;
  }

  async updateUser(id, data) {
    const user = new User(id, data.name, data.email, data.password, data.is_admin);
    await this.usersRepository.updateUser(user);
    return user;
  }

  async deleteUser(id) {
    await this.usersRepository.deleteUser(id);
  }

}

module.exports = ManageUsersUsecase;
