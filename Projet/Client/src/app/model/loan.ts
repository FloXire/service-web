export class Loan {
  constructor(
    public id: string,
    public bookId: string,
    public copyId: string,
    public userId: string,
    public loanDate: string,
    public hidden: boolean,
    public bookName: string,
    public userName: string
  ) {
  }
}
