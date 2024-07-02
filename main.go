package main

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"strconv"
)

const HTTP_PORT = ":8081"
const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

func main() {
	http.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.FileServer(http.Dir("./frontend")).ServeHTTP(w, r)
	}))
	http.Handle("/generate/", http.HandlerFunc(GenerateHandler))
	http.ListenAndServe(HTTP_PORT, nil)
}

func GenerateHandler(w http.ResponseWriter, r *http.Request) {
	number := r.URL.Path[len("/generate/"):]
	numberInt, err := strconv.Atoi(number)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid number"))
		return
	}
	randomStrings := []string{}
	for i := 0; i < numberInt; i++ {
		randomStrings = append(randomStrings, RandomString(10))
	}
	json, _ := json.Marshal(randomStrings)
	w.Write(json)
}

func RandomString(length int) string {
	randomString := make([]byte, length)
	for i := 0; i < length; i++ {
		randomString[i] = ALPHABET[rand.Intn(len(ALPHABET))]
	}
	return string(randomString)
}
