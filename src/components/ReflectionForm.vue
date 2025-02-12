<template>
    <v-container>
      <v-textarea v-model="reflection" label="Schrijf je reflectie..." outlined></v-textarea>
      <v-btn color="primary" @click="submitReflection">Opslaan</v-btn>
    </v-container>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        reflection: "",
      };
    },
    methods: {
      async submitReflection() {
        try {
          const token = localStorage.getItem("token"); // Zorg dat je een JWT-token hebt na login
          await axios.post(
            "http://localhost:8000/api/reflections/",
            { content: this.reflection },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          this.reflection = ""; // Reset input field
        } catch (error) {
          console.error("Fout bij opslaan:", error);
        }
      },
    },
  };
  </script>
  