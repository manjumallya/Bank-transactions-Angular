interface IAccountData {
  name: string;
  accounts: IAccount[];
}

interface IAccount {
  id: string;
  name: string;
  amount: number;
}
