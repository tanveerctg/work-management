<template>
  <div style="max-width:650px;width:100%;padding:30px 20px;">
     <p v-for="(project,index) in getProject.todos" :key="index">
       <span style="font-size:1.3rem;">{{project.todoText}}</span>
       <br/>
       <span>{{project.date}}</span>
     </p>
     <q-btn color="primary" icon-right="add" label="Add Task" @click="show=!show" v-if="show" />
    
    <div v-if="!show">
    <div class="inputContainer">
      <q-input v-model="todo" label="Task Name" />
      <q-btn icon="event" round color="primary">
        <q-popup-proxy @before-show="updateProxy" transition-show="scale" transition-hide="scale">
          <q-date v-model="proxyDate">
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="Cancel" color="primary" flat v-close-popup />
              <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-btn>
    </div>
       <q-btn color="primary" label="Add Task" @click="addTodoHandler" style="margin-right:5px;" />
       <q-btn flat label="Cancel" @click="show=!show" text-color="red"/>
    </div>
  </div>
</template>

<script>
import { date } from 'quasar'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import { v4 as uuidv4 } from 'uuid';

console.log('uuid',uuidv4())
let timeStamp = Date.now()
let formattedString = date.formatDate(Date.now(), 'DD-MM-YYYY')

export default {
  name: 'single-project',
  data () {
    return {
        todo: '',
        date: date.formatDate(Date.now(), 'YYYY/MM/DD HH:mm a'),
        proxyDate: date.formatDate(Date.now(), 'YYYY/MM/DD HH:mm a'),
        parmsVal:this.$route.params.projectId,
        getProject:null,
        show:true
    }
  },
  methods:{
     ...mapActions(['addTodo']),
    updateProxy () {
      this.proxyDate = this.date
    },
    save () {
      this.date = this.proxyDate
    },
    addTodoHandler(){
      this.addTodo({projectId:this.parmsVal,todoText:this.todo,date:this.date,id:uuidv4()});
      this.todo='';
    }
  },
  computed: {
         ...mapGetters([
      'allProjects'
    ])
  },
  created(){
    const getProject=this.allProjects.find(x=>x.projectId==this.parmsVal);
    console.log('getProject',getProject)
    this.getProject=getProject;
  }
}
</script>

<style scoped>
  .inputContainer{
    display:grid;
    grid-template-columns:1fr auto;
    grid-gap:10px;
    align-items:center;
    margin-bottom:20px;
  }
</style>