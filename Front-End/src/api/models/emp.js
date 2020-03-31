

export default class empClass{
  id
  name
  email
  createdAt
  updatedAt
  level

  constructor(data){
    this.setData(data);
  }
  setData(obj){
    this.id = obj.id;
    this.name = obj.name;
    this.email = obj.email;
    this.createdAt = obj.createdAt;
    this.updatedAt = obj.updatedAt;
    this.level = obj.level;
  }
  getData(){
    return {
      id:this.id,
      name:this.name,
      email:this.email,
      createdAt:this.createdAt,
      updatedAt:this.updatedAt,
      level:this.level
    }
  }
}