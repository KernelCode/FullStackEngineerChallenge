export default class performance_reviewsClass{
  id
  emp
  review
  score
  updatedAt
  createdAt
  constructor(data){
    this.setData(data);
  }
  setData(obj){
    this.id = obj.id;
    this.emp = obj.emp;
    this.review = obj.review;
    this.score = obj.score;
    this.createdAt = obj.createdAt;
    this.updatedAt = obj.updatedAt;
  }
  getData(){
    return {
      id:this.id,
      emp:this.emp,
      review:this.review,
      score:this.score,
      updatedAt:this.updatedAt,
      createdAt:this.createdAt
    }
  }
}