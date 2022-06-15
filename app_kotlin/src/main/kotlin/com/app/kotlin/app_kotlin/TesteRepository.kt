package com.app.kotlin.app_kotlin

import org.springframework.data.mongodb.repository.MongoRepository

interface TesteRepository : MongoRepository<Teste, String>{
}