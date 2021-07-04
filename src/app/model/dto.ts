export class Hero {


  constructor(
    public id: number,
    public name: string,
    public strength: string
  ){}
  static getInstance():Hero{
    return new Hero(0,'','');
  }
}
