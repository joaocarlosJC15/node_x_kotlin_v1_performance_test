package com.app.kotlin.app_kotlin

import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "test")
data class Teste(
    val id: String,
    val value1: String,
    val value2: String,
    val value3: String,
    val value4: String,
    val value5: String,
    val value6: String,
    val value7: String,
    val value8: String,
    val value9: String,
    val value10: String
) {
}