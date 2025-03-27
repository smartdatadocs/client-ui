
<template>
  <v-container>
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
    };
  },
  methods: {
    uploadFile() {
     console.log(this.selectedFile.size) 
    },
    async submitFile() {
      if (!this.selectedFile) return;

      this.uploading = true;
      const formData = new FormData();
      formData.append("file", this.selectedFile);

      try {
        const response = await fetch("YOUR_N8N_WEBHOOK_URL", {
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
};
</script>
