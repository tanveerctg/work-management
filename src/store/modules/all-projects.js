const state={
    projects:[],
    searchProject:''
};
const getters={
    allProjects:state=>state.projects,
    searchProject:state=>state.searchProject
};
const actions={
    addProject({commit},project) {
       commit('addProject',project)
    },
    addTodo({commit},{projectId,todoText,date,id}){
        commit('addTodo',{projectId,todoText,date,id});
    },
    searchProject({commit},name){
        commit('searchProject',name);
    },
    editTodo({commit},{projectId,id,editTaskName}){
        commit('editTodo',{projectId,id,editTaskName});
    },
    deleteTodo({commit},{projectId,id}){
        commit('deleteTodo',{projectId,id});
    }
};
const mutations={
    addProject:(state,{data,id})=>state.projects.push({projectId:id,projectName:data,todos:[]}),
    addTodo:(state,{projectId,todoText,date,id})=>state.projects.find(x=>x.projectId==projectId).todos.push({todoText,date,id}),
    searchProject:(state,name)=>state.searchProject=name,
    editTodo:(state,{projectId,id,editTaskName})=>state.projects.find(project=>project.projectId==projectId).todos.find(todo=>todo.id==id).todoText=editTaskName,
    deleteTodo:(state,{projectId,id})=>state.projects.find(project=>project.projectId==projectId).todos=state.projects.find(project=>project.projectId==projectId).todos.filter(todo=>{if(todo.id!==id){return todo;}})
};

export default{state,getters,actions,mutations};