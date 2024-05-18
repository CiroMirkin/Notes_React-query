# App de notas con React Query

Una aplicación para aprender [React Query](https://www.npmjs.com/package/@tanstack/react-query).

## Comandos de desarrollo

En dos consolas diferentes al mismo tiempo:

Primero inicia el servidor del "backend":

```
npm run server
```

Luego inicia el servidor de desarrollo:

```
npm start
```

## Creación de una mutación

```javascript
const App = () => {
    // ...

    const queryClient = useQueryClient()

    // Definición de una mutación la cual nos permitirá crear una nueva nota
    const newNoteMutation = useMutation({ 
        mutationFn: createNote,
        onSuccess: () => {
            // Se invalidan los datos actuales para que se actualicen
            queryClient.invalidateQueries({ queryKey: ['notes'] })
        },
    })

    const addNote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''

        // Se realiza la mutación 
        newNoteMutation.mutate({ content, important: true })
    }

    // ...
}
```

## Optimización de rendimiento

Después de la solicitud PUT que causa el cambio de nota, la aplicación realiza una nueva solicitud GET para recuperar los datos de la query desde el servidor.

Si la cantidad de datos obtenidos por la aplicación no es grande, realmente no importa. Después de todo, desde el punto de vista de la funcionalidad del lado del navegador, hacer una solicitud HTTP GET adicional realmente no importa, pero en algunas situaciones podría generar una carga en el servidor

De esto:

```javascript
const newNoteMutation = useMutation({ 
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
```

A esto:

```javascript
const newNoteMutation = useMutation({ 
    mutationFn: createNote,
    onSuccess: (newNote) => {
      // Optimización del rendimiento manualmente actualizando el estado de la query.
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.concat(newNote))
    },
})
```

En el callback `onSuccess`: El objeto `queryClient` primero lee el estado existente en `notes` y lo actualiza agregando la nueva nota recibida como parámetro por el mismo callback `onSuccess`.

<!-- (˶ᵔ ᵕ ᵔ˶) -->
---
Fuente: [https://fullstackopen.com/es/part6/react_query_use_reducer_y_el_contexto](https://fullstackopen.com/es/part6/react_query_use_reducer_y_el_contexto)
