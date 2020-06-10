<template>
  <div class="wrapper">
    <div v-if="projects.length>0" class="projectsContainer">
     <p v-for="(project,index) in projects" :key="index">
        <router-link
              :to="'/'+ project.projectId"
              exact
            >
           {{project.projectName}}
        </router-link>
     </p>
    </div>
    <div v-else class="notFound">
     <p>No projects found</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PageIndex',
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'allProjects',
      'searchProject'
      // ...
    ]),
    projects(){
      let map=this.allProjects;
      if(!!this.searchProject){
        map=map.filter(project=>{
          if(project.projectName.toLowerCase().includes(this.searchProject.toLowerCase())){
            return project;
          }
       });
      }
      return map;
    }

  }
}
</script>

<style scoped>
.wrapper{
  padding:30px 20px;
  font-size:1.3rem;
}
a{
  text-decoration: none !important;
  color:#111111;
}
.projectsContainer{
  display:flex;
  flex-wrap: wrap;
}
.projectsContainer p{
  margin:0 20px 25px 0;
  padding: 15px 15px;
  -webkit-box-shadow: 0px 3px 7px -4px rgba(85,85,85,1);
  -moz-box-shadow: 0px 3px 7px -4px rgba(85,85,85,1);
  box-shadow: 0px 3px 7px -4px rgba(85,85,85,1);
  min-width: 200px;
  text-align: center;
}
</style>
