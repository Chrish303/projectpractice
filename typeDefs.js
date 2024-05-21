const { gql } = require('apollo-server');

const typeDefs = gql`
    scalar DateTime

     type Query {
        owners: [Owner!]!
        owner(id:ID!):Owner
        companies: [Company!]!
        company(id:ID!):Company
        employees:[Employee!]!
        employee(id:ID!):Employee
        profiles:[Profile!]!
        profile(id:ID!):Profile
        customers:[Customer!]!
        customer(id:ID!):Customer
        CustomerProfiles:[CustomerProfile!]!
        CustomerProfile(id:ID!):CustomerProfile
        Projects:[Project!]!
        Project(id:ID!):Project
        projectManager(id:ID!): Employee
        }

     type Owner {
        id: Int!
        name: String!
        companies: [Company!]!
        createdAt: DateTime!
        updatedAt: DateTime!
        }

    type Company {
        id: Int!
        name: String!
        owner: Owner
        employees: [Employee!]!
        projects: [Project!]!
        createdAt: DateTime!
        updatedAt: DateTime!
        }

     type Employee {
        id: Int!
        name: String!
        phone: String!
        salary: Int!
        company: Company
        project: Project
        createdAt: DateTime!
        updatedAt: DateTime!
        profile: Profile
        projectManager: [Project!]!
        projectAccountController: [Project!]!
        }


    type Project {
        ProjectId: Int!
        projectName: String!
        customerName: Customer
        projectGroup: String!
        projectType: projectType
        StartDate: DateTime
        DueDate: DateTime
        ProjectOwner: String!
        projectManagerId: Int!
        projectManager: Employee
        projectAccountControllerId: Int!
        projectAccountController: Employee
        company: Company
        createdAt: DateTime!
        updatedAt: DateTime!
        }

        type Profile {
        id: ID!
        image: String!
        email: String!
        emergencyContact: String!
        bloodGroup: String!
        dateOfBirth: String!
        employee: Employee!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

        type Customer {
        id: Int!
        CustomerName: String!
        createdAt: DateTime!
        updatedAt: DateTime!
        projects: [Project!]!
        customerProfiles: [CustomerProfile!]!
        }

    type CustomerProfile {
        id: Int!
        companyName: String!
        email: String!
        phone: String!
        address: String!
        pincode: String!
        fax: String!
        website: String!
        customer: Customer
        createdAt: DateTime!
        updatedAt: DateTime!
        }

        
    enum projectType {
        fixed
        timeAndMaterial
        progressive
        }


    type Mutation {
        createOwner(name: String!): Owner!
        updateOwner(id: ID!, name: String!): Owner!
        deleteOwner(id: ID!): Owner!

        createCompany(name: String!, ownerId: ID!): Company!
        updateCompany(id: ID!, name: String!, ownerId: ID!): Company!
        deleteCompany(id: ID!): Company!

        createEmployee(name:String!, salary:Int!, phone:String!,companyId:ID!,projectId:ID!):Employee!
        updateEmployee(id:ID!,name:String!, salary:Int!, Phone:String, companyId:ID!):Employee!
        deleteEmployee(id:ID!):Employee!

        createProfile(image: String!, email: String!, emergencyContact: String!, bloodGroup: String!, dateOfBirth: String!, employeeId: ID!): Profile!
        updateProfile(id:ID!, image: String!, email: String!, emergencyContact: String!, bloodGroup: String!, dateOfBirth: String!, employeeId: ID!):Profile!
        deleteProfile(id:ID!):Profile!

        createCustomer(CustomerName:String!):Customer!
        updateCustomer(id:ID!,CustomerName:String!):Customer!
        deleteCustomer(id:ID!):Customer!

        createCustomerProfile(companyName:String!, email:String!, phone:String!, address:String!, pincode:String!, fax:String!, website:String!,customerId:ID!):CustomerProfile!
        updateCustomerProfile(id:ID!, companyName:String!, email:String!, phone:String!, address:String!, pincode:String!, fax:String!, website:String!,customerId:ID!):CustomerProfile!
        deleteCustomerProfile(id:ID!):CustomerProfile!

        createProject(projectName:String!, projectGroup:String!, StartDate:DateTime!, DueDate:DateTime!, ProjectOwner:String!, customerId:ID!, projectManagerId:ID!, projectAccountControllerId:ID!, companyId:ID!, projectType:projectType):Project!
        updateProject(ProjectId:ID!, projectName:String!, projectGroup:String!, StartDate:DateTime!, DueDate:DateTime!, ProjectOwner:String!, customerId:ID!, projectManagerId:ID!, projectAccountControllerId:ID!, companyId:ID!, projectType:projectType):Project!
        deleteProject(ProjectId:ID!):Profile!
    }
`;

module.exports = typeDefs;
