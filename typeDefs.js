const {gql} = require('apollo-server')
 
const typeDefs = gql`
    scalar DateTime
 
    type Owner {
      id: ID!
      name: String!
      companies: [Company]
      createdAt: DateTime!
      updatedAt: DateTime!
}
    type Company {
        id: ID!
        name: String!
        owner: [Owner]
        employees: [Employee!]!
        projects: [Project!]!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type Employee {
        id: ID!
        name: String!
        phone: String!
        salary: Int!
        company: Company!
        project: Project!
        profile: [Profile!]!
        createdAt: DateTime!
        updatedAt: DateTime!
  }
    type Project {
        id: ID!
        name: String!
        type: String!
        estimatedAmount: Int!
        company: Company!
        employees: [Employee!]!
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
    type Query {
        owners: [Owner!]!
        owner(id: ID!): Owner
        companies: [Company!]!
        company(id: ID!): Company
        employees: [Employee!]!
        employee(id:ID!): Employee
    }
    type Mutation{
        createOwner(name:String!):Owner!
        updateOwner(id: ID!, name: String!): Owner!
        deleteOwner(id: ID!): Owner!
 
        createCompany(name: String!, ownerId: ID!): Company!
        updateCompany(id: ID!, name: String!, ownerId: ID!): Company!
        deleteCompany(id: ID!): Company!
 
        createEmployee(name:String!,phone:String!,salary:Int!,companyId:ID!,projectId:ID): Employee!
        updateEmployee(id:ID!,name:String!,phone:String!,salary:Int!,companyId:ID!,projectId:ID!): Employee!
        deleteEmployee(id: ID!): Employee!

        createProject(name:String!, type:String!, estimatedAmount:Int!, companyId:ID!, employeeID:ID! ):Project!
    }
 
`
module.exports=typeDefs;