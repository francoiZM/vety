# VETy - Aplicación Móvil Veterinaria

## Información General

**Asignatura:** Desarrollo de Aplicaciones Móviles
**Profesor:** VICENTE ZAPATA
**Estudiante:** FRANCO ZUÑIGA MARTINEZ

## Descripción del Contexto

VETy es una aplicación móvil diseñada para optimizar y agilizar el trabajo en consultas y hospitales veterinarios. La aplicación se enfoca en dos aspectos principales:

1. **Herramienta Profesional:**

   - Cálculo rápido y preciso de dosis de medicamentos
   - Asistencia en procedimientos de enfermería
   - Gestión de consultas veterinarias (Comunicacion con desarrollo web -->  VetWeb)
2. **Futuras Características para Clientes:**

   - Sistema de recordatorios para tratamientos
   - Seguimiento de prescripciones veterinarias
   - Conexión directa con el veterinario de cabecera (Comunicacion con desarrollo web -->  VetWeb)

## Conceptos del Framework

El proyecto está desarrollado utilizando las siguientes tecnologías:

### Ionic Framework

- Framework de desarrollo multiplataforma
- Permite crear aplicaciones híbridas utilizando tecnologías web
- Proporciona componentes UI pre-construidos con diseño adaptativo
- Acceso a funcionalidades nativas del dispositivo

### Angular

- Framework MVW (Model-View-Whatever) para desarrollo web
- Arquitectura basada en componentes
- Sistema de inyección de dependencias
- Routing robusto para navegación
- TypeScript como lenguaje principal

## Patrones de Diseño

### 1. Arquitectura por Componentes

- Estructura modular y reutilizable
- Encapsulación de funcionalidades
- Facilita el mantenimiento y escalabilidad

### 2. Patrón MVVM (Model-View-ViewModel)

- **Modelo:** Representa los datos y la lógica de negocio
- **Vista:** Interfaz de usuario (páginas y componentes)
- **ViewModel:** Intermediario entre Modelo y Vista, maneja la lógica de presentación

### 3. Patrón Singleton

- Utilizado en servicios de Angular
- Garantiza una única instancia de servicios críticos
- Gestión centralizada de datos

### 4. Patrón Observer

### 5. Integración de periféricos 

#### Cámara (Capacitor Camera)

- Permite capturar y asociar fotos a medicamentos en el inventario.
- Uso de la API nativa mediante Capacitor para acceder a la cámara del dispositivo.
- Gestión de permisos: Solicitud y verificación de permisos de cámara al usuario.
- Persistencia: Las imágenes capturadas se almacenan en localStorage y se asocian a cada medicamento.

#### Notificaciones locales (Capacitor LocalNotifications)

- Recordatorio de dosis y tareas mediante notificaciones programadas.
- El usuario puede configurar la hora y cantidad de días para recibir recordatorios.
- Gestión de permisos: Solicitud y verificación de permisos de notificaciones.
- Persistencia: Las tareas y recordatorios se almacenan en localStorage.
