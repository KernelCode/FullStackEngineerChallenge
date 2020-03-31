
export default class feedbackClass{
  id
  feedback_text
  performance_review
  emp
  createdAt
  updatedAt
  constructor(data){
    this.setData(data);
  }
  setData(obj){
    this.id = obj.id;
    this.feedback_text = obj.feedback_text;
    this.performance_review = obj.performance_review;
    this.createdAt = obj.createdAt;
    this.updatedAt = obj.updatedAt;
    this.emp = obj.emp;
  }
  getData(){
    return {
      id:this.id,
      feedback_text:this.feedback_text,
      performance_review:this.performance_review,
      createdAt:this.createdAt,
      updatedAt:this.updatedAt,
      emp:this.emp
    }
  }
}