package com.app.kotlin.app_kotlin

import org.springframework.data.repository.findByIdOrNull
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
class Controller(
    private val repository: TesteRepository
) {
    @GetMapping("/get/{id}")
    fun get(@PathVariable id: String): TesteDto? {
        val result = repository.findByIdOrNull(id)

        result?.let {
            return TesteDto(
                id = result.id,
                value1 = result.value1,
                value2 = result.value2,
                value3 = result.value3,
                value4 = result.value4,
                value5 = result.value5,
                value6 = result.value6,
                value7 = result.value7,
                value8 = result.value8,
                value9 = result.value9,
                value10 = result.value10
            )
        } ?: run {
            return null
        }
    }

    @PostMapping("/post")
    fun post(@RequestBody dto: TesteDto): TesteDto {
        val teste = Teste(
            id = UUID.randomUUID().toString(),
            value1 = dto.value1,
            value2 = dto.value2,
            value3 = dto.value3,
            value4 = dto.value4,
            value5 = dto.value5,
            value6 = dto.value6,
            value7 = dto.value7,
            value8 = dto.value8,
            value9 = dto.value9,
            value10 = dto.value10
        )

        val result = repository.save(teste)

        return TesteDto(
            id = result.id,
            value1 = result.value1,
            value2 = result.value2,
            value3 = result.value3,
            value4 = result.value4,
            value5 = result.value5,
            value6 = result.value6,
            value7 = result.value7,
            value8 = result.value8,
            value9 = result.value9,
            value10 = result.value10
        )
    }
}

data class TesteDto (
    val id: String? = null,
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
)