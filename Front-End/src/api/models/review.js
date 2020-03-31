export default class reviewsClass{
  id
  title
  updatedAt
  createdAt
  constructor(data){
    this.setData(data);
  }
  setData(obj){
    this.id = obj.id;
    this.title = obj.title;
    this.createdAt = obj.createdAt;
    this.updatedAt = obj.updatedAt;
  }
  getData(){
    return {
      id:this.id,
      title:this.title,
      updatedAt:this.updatedAt,
      createdAt:this.createdAt
    }
  }
}