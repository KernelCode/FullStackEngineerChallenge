// fetch()
import empClass from "./models/emp";
import feedbackClass from "./models/feedback";
import reviewsClass from "./models/review";
import performance_reviewsClass from "./models/perf";

const tableClass = {
  employees:empClass,
  feedbacks:feedbackClass,
  reviews:reviewsClass,
  performance_reviews:performance_reviewsClass
}

export default class API{
  static url = `http://${window.location.hostname}:3333`;
  static config = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  static logout(){
    return fetch(`${this.url}/logout`, {
      method: 'GET',
      ...this.config
    })
    .then((res) => res.json());
  }
  static isLogin(){
    
    return new Promise((res,rej)=>{ 
        fetch(`${this.url}/islogin`, {
          method: 'GET',
          ...this.config
        })
        .then((res) => res.json())
        .then(data=>{
          if(data.msg==="ok"){
         
            res(data.data);
          }else{
            res(data.data);
          }
        }).catch(err=>rej(err));
      });
  }

  static saveReview(data){
    return fetch(`${this.url}/admin/reviews/${data.id}`,{
      method:"PUT",
      body:JSON.stringify(data),
      ...this.config
     
    }).then((res) => res.json());
  }
  static addTag(tagId,userId){
    return fetch(`${this.url}/admin/addTag/${tagId}/${userId}`,{
      method:'GET',
      ...this.config
    }).then((res) => res.json());
  }
  static removeTag(tagId,userId){
    return fetch(`${this.url}/admin/removeTag/${tagId}/${userId}`,{
      method:'GET',
      ...this.config
    }).then((res) => res.json());
  }
  static saveEmp(data){
    return fetch(`${this.url}/admin/employees/${data.id}`,{
      method:"PUT",
      body:JSON.stringify(data),
      ...this.config
     
    }).then((res) => res.json());
  }
  
  static postFeedback(feedback,prefId){
    
    return fetch(`${this.url}/postFeedback`,{
      method:"POST",
      body:JSON.stringify({feedback,prefId}),
      ...this.config
     
    }).then((res) => res.json());
  }
  static login(data){
   
    return fetch(`${this.url}/login`,{
      method:"POST",
      body:JSON.stringify(data),
      ...this.config
     
    }).then((res) => res.json());
  }
  static getWrapper(url){
    return new Promise((res,rej)=>{
      fetch(url,{
        method:"GET",
        ...this.config
      })
      .then((res) => res.json())
      .then(data=>{
        res(data);
      }).catch(err=>rej(err));
    });
  }
  static getFeedbacks(perfId,userId){
    return new Promise((res,rej)=>{
    
      this.getWrapper(`${this.url}/feedbacks/${perfId}`).then(data=>{
       
        res(data);
      }).catch(err=>{
        rej([]);
      })
    })
  }
  static getAll(tableName){
    return new Promise((res,rej)=>{
    
      this.getWrapper(`${this.url}/${tableName}/all`).then(data=>{
        
        let datAry =[]
        data.length && data.forEach((d)=>{
          datAry.push(new tableClass[tableName](d))
        });
        res(datAry);
      }).catch(err=>{
        rej([]);
      })
    })
  
  }
  static getEmp(id){
    return new Promise((res,rej)=>{
      fetch(`${this.url}/employe/${id}`,{
        method:"GET",
        ...this.config
      })
      .then((res) => res.json())
      .then(data=>{
        res(data);
      }).catch(err=>{
        rej(err);
      })
    })
  }
  static get(tableName,id){
    return new Promise((res,rej)=>{
      fetch(`${this.url}/${tableName}/${id}`,{
        method:"GET",
        ...this.config
      })
      .then((res) => res.json())
      .then(data=>{
        res(new tableClass[tableName](data));
      }).catch(err=>{
        rej(err);
      })
    })
  }
  static getLimitTable(tableName,tableData){
    /*
      // sending
      page: state.page,
      pageSize: state.pageSize,
      sorted: state.sorted,
      filtered: state.filtered

      // returing
      data: res.data.rows,
      pages: res.data.pages,
      loading: false
    */
    return fetch(`${this.url}/getTable/${tableName}`,{
        method:"POST",
        body:JSON.stringify(tableData),
        ...this.config
      })
      .then((res) => res.json())
 

  }
  static getLimit(tableName,off,limit){
    return new Promise((res,rej)=>{
      fetch(`${this.url}/${tableName}/${off}/${limit}`,{
        method:"GET",
        ...this.config
      })
      .then((res) => res.json())
      .then(data=>{
        let datAry =[]
        data.length && data.forEach((d)=>{
          datAry.push(new tableClass[tableName](d))
        });
        res(datAry);
      }).catch(err=>{
        rej(err);
      })
    })
  }
  
  static add(tableName,data){
    return fetch(`${this.url}/admin/${tableName}`,{
      method:"POST",
      body:JSON.stringify(data),
      ...this.config
    }).then((res) => res.json());
  
    
  }
  
  static del(tableName,id){
    return fetch(`${this.url}/admin/${tableName}/${id}`,{
      method:'DELETE',
      ...this.config
    }).then((res) => res.json());
  }
}

