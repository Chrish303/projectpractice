const { PrismaClient } = require('@prisma/client');
const { parseInt } = require('lodash');
const prisma = new PrismaClient()

const resolvers = { 
    Query:{
        // FETCH the owner details;
        owners:async()=>{
           try{
            return await prisma.owner.findMany();
           }catch(error){
            console.error('Error to fetch owner')
            throw new Error('Failed to fetch owner')
           }
        },
        owner:async(_,{id})=>{
            try{
                return await prisma.owner.findUnique({
                    where:{
                        id:parseInt(id)
                    }
                })
            }catch(error){
                console.error('Error to find data')
                throw new Error('Failed to find error')
            }
        },
        // FETCH the ompany details;
        companies : async()=>{
            try{
                return await prisma.company.findMany();
            }catch(error){
                console.error('Error to fetch company details',error);
                throw new Error('Failed to fetch error')
            }
        },
        company : async(_,{ id })=>{
            try{
                return await prisma.company.findUnique({
                    where:{
                        id:parseInt(id)
                    }
                })
            }catch(error){
                console.error('Error to find company',error);
                throw new Error('Error to find company')
            }
        },
        // FETCH the Employeee
        employees:async()=>{
            try{
                return await prisma.employee.findMany();
            }catch(error){
                console.error('Error to fetch employeee',error);
                throw new Error('Failed to fetch employee')
        }

        },
        employee:async(_,{ id })=>{
            try{
                return await prisma.employee.findUnique({
                    where:{
                        id:parseInt(id)
                    }
                })
            }catch(error){
                console.error('Error to find employye',error);
                throw new Error('Failed to find employee')
            }
        }
    },

    Mutation : {
        // Owner CURD operation
        createOwner:async(_,{name})=>{
            try{
                const createowner = await prisma.owner.create({
                    data:{
                        name
                    }
                });return createowner
            }catch(error){
                console.error('Error to create owner',error);
                throw new Error('Failed to create owner')
            }
        },
        updateOwner:async(_,{ id,name })=>{
            try{
                const updateOwner = await prisma.owner.update({
                    where:{
                        id:parseInt(id)
                    },
                    data:{
                        name:name
                    }
                });return updateOwner;
            }catch(error){
                console.error('Error to update owner',error)
                throw new Error("Failed to update owner")
            }
        },
        deleteOwner: async (_, { id }) => {
            try {
                const deletedOwner = await prisma.owner.delete({
                    where: {
                        id: parseInt(id)
                    }
                });
                return deletedOwner;
            } catch (error) {
                console.error('Error deleting owner:', error);
                throw new Error('Failed to delete owner');
            }
        },
        //  Company CURD operation
        createCompany: async (_, { name, ownerId }) => {
            try {
                const createCompany = await prisma.company.create({
                    data: {
                        name: name,
                        owner_id: parseInt(ownerId)
                    }
                });
                return createCompany;
            } catch (error) {
                console.error('Error creating company:', error);
                throw new Error('Failed to create company');
            }
        },
        updateCompany:async(_,{ id,name,ownerId})=>{
            try{
                const updateCompany = await prisma.company.update({
                    where:{
                        id : parseInt(id)
                    },
                    data:{
                        name:name,
                        owner_id:parseInt(ownerId)
                    }
                });return updateCompany;
            }catch(error){
                console.log('Error to Update company',error);
                throw new Error('Failed to update company')
            }
        },
        deleteCompany:async(_,{ id })=>{
            try{
                const deleteCompany = await prisma.company.delete({
                    where:{
                        id:parseInt(id)
                    }
                });return deleteCompany;
            }catch(error){
                console.error('Error to delete company',error)
                throw new Error('Failed to delete company')
            }
        },
        createEmployee: async (_, { name, phone, salary, companyId, projectId }) => {
            try {
                const createEmployee = await prisma.employee.create({
                    data: {
                        name: name,
                        phone: phone,
                        salary: salary,
                        companyId: parseInt(companyId), // Correct field name
                        projectId: parseInt(projectId) // Correct field name
                    }
                });
                return createEmployee;
            } catch (error) {
                console.error('Error creating employee:', error);
                throw new Error('Failed to create employee');
            }
        },
        updateEmployee: async (_, { id, name, phone, salary, companyId, projectId }) => {
            try {
                const updatedEmployee = await prisma.employee.update({
                    where: {
                        id: parseInt(id)
                    },
                    data: {
                        name: name,
                        phone: phone,
                        salary: salary,
                        companyId: parseInt(companyId),
                        projectId: parseInt(projectId)
                    }
                });
                return updatedEmployee;
            } catch (error) {
                console.error('Error updating employee:', error);
                throw new Error('Failed to update employee');
            }
        },     
        deleteEmployee:async(_,{ id })=>{
            try{
                const deleteEmployee = await prisma.employee.delete({
                    where:{
                        id:parseInt(id)
                    }
                });return deleteEmployee;
            }catch(error){
                console.error('Error to delete employee',error)
                throw new Error('Faild to delete')
            }
        },
        createProject: async (_, { name, type, estimatedAmount, companyId, employeeId }) => {
            try {
                const createProject = await prisma.project.create({
                    data: {
                        name: name,
                        type: type,
                        estimatedAmount: estimatedAmount,
                        companyId: parseInt(companyId),
                        employeeId: parseInt(employeeId)
                    }
                });
                return createProject;
            } catch (error) {
                console.error('Error creating project:', error);
                throw new Error('Failed to create project');
            }
        },
        
        
    }
}

module.exports =  resolvers, prisma ;
