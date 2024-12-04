export class User {
  fullName: string;
  userName: string;
  emailId: string;
  gender: string;
  mobileNo: string;
  password: string;
  confirmPassword: string;
  status: string;

  constructor(init?: Partial<User>) {
    this.fullName = init?.fullName || '';
    this.userName = init?.userName || '';
    this.emailId = init?.emailId || '';
    this.gender = init?.gender || '';
    this.mobileNo = init?.mobileNo || '';
    this.password = init?.password || '';
    this.confirmPassword = init?.confirmPassword || '';
    this.status = init?.status || '';
  }
}
