<template>
  <v-container>
    <div class="dropdown-container">
    <div class="dropdown-item">
      <label class="label" for="dept">Department:</label>
      <select id="dept" v-model="selectedDept" @change="updateAppDropdown">
        <option value="">Select Department</option>
        <option v-for="dept in depts" :key="dept.label" :value="dept.label">{{ dept.label }}</option>
      </select>
    </div>
    <div class="dropdown-item">
      <label class="label" for="aplication">Application:</label>
      <select style="text-align:start" id="aplication" v-model="selectedApp">
        <option value="">Select Application</option>
        <option v-for="app in apps" :key="app.label" :value="app.label">{{ app.label }}</option>
      </select>
    </div>
  </div>
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
  </v-container>
</template>

<script>
export default {
  name: 'Home',
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
    },
  },
  mounted() {
    this.selectedOrganization = 'DHS';
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
</style>