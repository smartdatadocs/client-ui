<template>
    <v-container>
      <div class="dropdown-container">
        <v-row>
      <!-- Department Dropdown -->
      <v-col cols="6">
      <div class="dropdown-item">
       
  
        <v-select 
    id="dept" 
    v-model="selectedDept" 
    :options="depts.map(dept => dept.label)" 
    placeholder="Select Department" 
    @input="updateAppDropdown"
    label="Department">
    >
  </v-select>
  
      </div>
    </v-col>
<v-col>
      <div class="dropdown-item">
      
        <v-select 
    id="aplication" 
    v-model="selectedApp" 
    :options="apps.map(app => app.label)" 
    placeholder="Select Application" 
    label="Application">
  </v-select>
      </div>
    </v-col>
    </v-row>
    </div>


  

        <v-stepper :items="['Select file to upload', 'Enter Metadata', 'Save']">
        <template v-slot:item.1>
         <!--  <v-card title="" flat>
            <v-file-input
        label="Upload File"
        v-model="selectedFile"
        accept="image/*, .pdf,.txt"
        show-size
        @change="uploadFile"
      ></v-file-input>
  
      <v-btn :disabled="!selectedFile" color="primary" @click="submitFile">
        Upload
      </v-btn>
  
      <v-progress-linear
        v-if="uploading"
        indeterminate
        color="blue"
      ></v-progress-linear>
  
      <v-alert v-if="uploadSuccess" type="success">
        File uploaded successfully!
      </v-alert>

      
        </v-card> -->

        <UploadDropBox></UploadDropBox>
        </template>
      
        <template v-slot:item.2>
          <v-card title="Step Two" flat>...</v-card>
        </template>
      
        <template v-slot:item.3>
          <v-card title="Step Three" flat>...</v-card>
        </template>
      </v-stepper>




     
    </v-container>
  </template>
  
  <script>
  import DataService from '../services/dataService.js';
  import UploadDropBox from './UploadDropBox.vue';
  export default {
    name: 'Upload',
    components: {
      // Import Vuetify components here
      DataService,
      UploadDropBox
    },
    data() {
      return {
        selectedFile: null,
        uploading: false,
        uploadSuccess: false,
        selectedOrganization: '',
        selectedDept: '',
        selectedApp: '',
        organizations: [],
        depts: [],
        apps: [],
        hierarchydata: {
          "label": "DHS",
          "children": [
            {
              "label": "FIA",
              "children": [
                {
                  "label": "ae",
                  "children": []
                },
                {
                  "label": "asdf",
                  "children": []
                }
              ]
            },
            {
              "label": "DOE",
              "children": [
                {
                  "label": "xyz",
                  "children": []
                },
                {
                  "label": "ssd",
                  "children": []
                },
                {
                  "label": "kpg",
                  "children": []
                }
              ]
            }
          ]
        }
      };
    },
    methods: {
      populateDropdown(dropdown, options) {
        this[dropdown] = options;
      },
      updateDeptDropdown() {
        const selectedOrganization = this.selectedOrganization;
        let organization = this.hierarchydata.children.find(child => child.label === selectedOrganization);
        if (!organization) {
          organization = this.hierarchydata;
        }
        if (organization) {
          this.populateDropdown('depts', organization.children);
        } else {
          this.depts = [];
        }
        this.apps = [];
        this.selectedDept = '';
        this.selectedApp = '';
      },
      updateAppDropdown() {
        const selectedOrganization = this.selectedOrganization;
        const selectedDept = this.selectedDept;
        let organization = this.hierarchydata.children.find(child => child.label === selectedOrganization);
        if (!organization) {
          organization = this.hierarchydata;
        }
        if (organization) {
          const dept = organization.children.find(child => child.label === selectedDept);
          if (dept) {
            this.populateDropdown('apps', dept.children);
          } else {
            this.apps = [];
          }
        } else {
          this.apps = [];
        }
        this.selectedApp = '';
      },
      uploadFile() {
        console.log(this.selectedFile.size);
      },
      async submitFile() {
        if (!this.selectedFile) return;
  
        this.uploading = true;
        const formData = new FormData();
        formData.append("file", this.selectedFile);
           // Create metadata object
           const metadata = {
            documentType: this.selectedFile.type,
            documentSize: this.selectedFile.size,
            documentName: this.selectedFile.name,
          organization: this.selectedOrganization,
          department: this.selectedDept,
          application: this.selectedApp,
        };
  
        // Append metadata as a JSON string
        formData.append("metadata", JSON.stringify(metadata));
  
        try {
          const response = await fetch("http://localhost:8001", {
            method: "POST",
            body: formData,
          });
  
          if (response.ok) {
            this.uploadSuccess = true;
          }
        } catch (error) {
          console.error("Upload failed:", error);
        } finally {
          this.uploading = false;
        }
      }, getAdminAppDetails() {
      DataService.getAdminAppDetails(this.selectedOrganization)
        .then((response) => {
         
          DataService.getOranizationHiearachy(response[0].port)
            .then((resp) => {
              this.hierarchydata = resp[0];
              this.updateDeptDropdown();
            })
            .catch((error) => {
              console.error("Error fetching hierarchy data:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching hierarchy data:", error);
        });
    },
    },
   
    mounted() {
      this.selectedOrganization = 'DHS';
      this.getAdminAppDetails();
      this.updateDeptDropdown();
      
    },
  };
  </script>
  <style scoped>
  .dropdown-container {
    display: flex;
    flex-direction: column;
    gap: 10px; /* Adjust the gap between dropdowns as needed */
  }
  
  select {
   border-style: solid;
    color: black;
    min-width: 200px;
    margin: 10px;
  }
  
  label {
    min-width: 115px; /* Adjust the width of the label as needed */
  }
  
  .label{
     text-align: justify;
  }
.v-container{   
   margin-left: inherit;
  }
  </style>