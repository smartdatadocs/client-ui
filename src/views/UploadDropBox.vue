<template>
    <v-container class="d-flex justify-center">
      <v-card class="upload-card">
        <!-- Upload Header -->
        <h3 class="upload-title">Upload Your Files</h3>
  
        <!-- Drag and Drop Area -->
        <div
          class="file-drop-zone"
          @dragover.prevent="dragOver = true"
          @dragleave.prevent="dragOver = false"
          @drop.prevent="handleDrop"
          :class="{ 'drag-over': dragOver }"
          @click="triggerFileInput"
        >
          <v-icon class="upload-icon">mdi-cloud-upload</v-icon>
          <p class="drop-text">Click or Drag & Drop files here</p>
          <v-file-input
            ref="fileInput"
            class="hidden-file-input"
            multiple
            v-model="selectedFiles"
            accept="image/png, image/jpeg, application/pdf, video/mp4"
            hide-details
            @change="handleFileInput"
          ></v-file-input>
        </div>
  
        <!-- Browse Button -->
        <v-btn color="primary" class="browse-btn" @click="triggerFileInput">
          Browse Files
        </v-btn>
  
        <!-- Uploaded Files List -->
        <div v-if="files.length > 0" class="file-list">
          <div
            v-for="(file, index) in files"
            :key="index"
            class="file-info"
            @mouseover="hoveredFile = index"
            @mouseleave="hoveredFile = null"
            :class="{ 'hovered': hoveredFile === index }"
          >
            <span class="file-name">{{ file.name }}</span>
            <v-btn icon @click="removeFile(index)">
              <v-icon color="red">mdi-close-circle</v-icon>
            </v-btn>
          </div>
        </div>
  
        <!-- File Hint -->
        <p class="file-hint">JPG, PNG, PDF, or MP4 (max 100MB each)</p>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedFiles: null, // Holds selected files
        files: [], // Stores all uploaded files
        dragOver: false, // Tracks if files are being dragged over the drop zone
        hoveredFile: null, // Tracks which file is hovered
      };
    },
    methods: {
      // Trigger file input when clicking the drop zone or button
      triggerFileInput() {
        this.$refs.fileInput.$el.querySelector("input[type='file']").click();
      },
  
      // Handle manual file selection (via browse button)
      handleFileInput(event) {
        if (this.selectedFiles) {
          this.addFiles(this.selectedFiles);
        }
      },
  
      // Handle file drop event
      handleDrop(event) {
        this.dragOver = false;
        const droppedFiles = Array.from(event.dataTransfer.files);
        this.addFiles(droppedFiles);
      },
  
      // Add new files to the list
      addFiles(newFiles) {
        newFiles.forEach(file => {
          if (!this.files.some(existingFile => existingFile.name === file.name)) {
            this.files.push(file);
          }
        });
      },
  
      // Remove a file from the list
      removeFile(index) {
        this.files.splice(index, 1);
      },
    }
  };
  </script>
  
  <style scoped>
  .upload-card {
    border-radius: 12px;
    padding: 25px;
    width: 500px;
    text-align: center;
    background: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .upload-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }
  
  .file-drop-zone {
    border: 2px dashed #007bff;
    padding: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
    cursor: pointer;
    text-align: center;
    transition: all 0.3s ease;
  }
  
  .file-drop-zone.drag-over {
    background-color: #e3f2fd;
    border-color: #0056b3;
  }
  
  .upload-icon {
    font-size: 36px;
    color: #007bff;
  }
  
  .drop-text {
    color: #555;
    font-size: 14px;
    margin-top: 8px;
  }
  
  .hidden-file-input {
    display: none;
  }
  
  .browse-btn {
    margin-top: 10px;
  }
  
  .file-list {
    margin-top: 15px;
  }
  
  /* Normal file display */
  .file-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f1f1f1;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 5px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  /* Hover effect: Pop-up effect */
  .file-info.hovered {
    transform: scale(1.05);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    background: lightgray;
  }
  
  .file-name {
    font-weight: bold;
    color: #333;
  }
  
  .file-hint {
    font-size: 12px;
    color: gray;
    margin-top: 10px;
  }
  </style>
  