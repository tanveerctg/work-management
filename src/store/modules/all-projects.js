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
       console.log('project',project)
       commit('addProject',project)
    },
    addTodo({commit},{projectId,todoText,date,id}){
        console.log('addTodo',projectId,todoText,date,id);
        console.log(state.projects);
        console.log(state.projects.find(x=>x.projectId==projectId))
        commit('addTodo',{projectId,todoText,date,id});
    },
    searchProject({commit},name){
        console.log(name);
        commit('searchProject',name);
    }
};
const mutations={
    addProject:(state,{data,id})=>state.projects.push({projectId:id,projectName:data,todos:[]}),
    addTodo:(state,{projectId,todoText,date,id})=>state.projects.find(x=>x.projectId==projectId).todos.push({todoText,date,id}),
    searchProject:(state,name)=>state.searchProject=name
};

export default{state,getters,actions,mutations};