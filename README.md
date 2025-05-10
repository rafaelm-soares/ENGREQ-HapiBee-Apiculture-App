# HapiBee - Apiculture Management System

HapiBee is a mobile and backend system designed to support beekeeping operations, planning, and communication with official Portuguese authorities. Developed as part of the "Engenharia de Requisitos" course at ISEP.

## 📋 Project Overview

Developed in collaboration with DGADR, HapiBee enhances the beekeeping workflow by:
- Managing apiaries, inspections, and honey collection.
- Supporting official processes: inventory declarations, transhumance requests, and disease reporting.
- Planning and tracking daily tasks and operations.

## 🔧 Technologies

### Frontend
- **React + TypeScript**: component-based UI development.
- **Mobile-focused**: Responsive design and usability.

### Backend
- **Java + Spring Boot**: RESTful API development.
- **Multi-tenant**: Supports multiple beekeepers.

### Database
- **SQL Server**: Secure and normalized relational data storage.

### Other Tools
- **Postman**: Used for mocking external API endpoints (e.g. DGAV).
- **Azure**: Cloud deployment and hosting.
- **Jira**: Agile project management.
- **Bitbucket**: Version control.

## 🧪 Functionalities by Sprint

### Sprint 1
- Apiary creation and installation requests.
- Inventory declaration and inspection registration.
- Transhumance request.
- Honey harvest and colony splitting.

### Sprint 2
- Historical data view for apiaries, inspections, and harvests.
- Improvements based on Sprint 1 feedback.
- Offline operation with sync on reconnection.

## 🧱 Architecture

- **Mobile Frontend (HapiBee App)**
- **Backend API (Spring Boot)**
- **Mock Portal Backend (Postman)**
- Follows component and domain-driven design.

## 🧠 Development Process

- Agile methodology (Scrum).
- Daily standups and sprint planning.
- User stories managed via Jira, labeled by epic and sprint.
- Commit structure: `feat: Added inspection module | #HAP-76 #HAP-77`.

## 📸 Screenshots

Screens and mockups included in the `/docs` folder, along with diagrams:
- Component Diagram
- Domain Model
- Use Case Diagram

## 🔒 Non-Functional Requirements

- Works offline with synchronization when reconnected.
- Secure API communication.
- Scalable and maintainable architecture.

## 📂 Repository Structure

- /hapibee → Backend Spring Boot project
- /hapibee-app → React Native frontend project
- /docs → Diagrams, user stories, screenshots, and reports
- /postman-mock → Postman collection simulating the portal backend

## License
This system was developed for academic purposes within ISEP's Master's in Informatics Engineering.
Educational prototype for academic use. All rights reserved to original authors.


