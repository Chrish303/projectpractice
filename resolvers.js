const { PrismaClient } = require('@prisma/client');
const { parseInt } = require('lodash');
const prisma = new PrismaClient()

const resolvers = {
    // Query: {
    //     owners: async () => await prisma.owner.findMany(),
    //     owner: async (_, { id }) => await prisma.owner.findUnique({ where: { id: parseInt(id) } }),
    //     companies: async () => await prisma.company.findMany(),
    //     company: async (_, { id }) => await prisma.company.findUnique({ where: { id: parseInt(id) } }),
    //     employees: async () => await prisma.employee.findMany(),
    //     employee: async (_, { id }) => await prisma.employee.findUnique({ where: { id: parseInt(id) } })
    // },
    // Mutation: {
    //     createOwner: async (_, { name }) => await prisma.owner.create({ data: { name } }),
    //     updateOwner: async (_, { id, name }) => await prisma.owner.update({ where: { id: parseInt(id) }, data: { name } }),
    //     deleteOwner: async (_, { id }) => await prisma.owner.delete({ where: { id: parseInt(id) } }),

    //     createCompany: async (_, { name, ownerId }) => await prisma.company.create({ data: { name, owner_id: parseInt(ownerId) } }),
    //     updateCompany: async (_, { id, name, ownerId }) => await prisma.company.update({ where: { id: parseInt(id) }, data: { name, owner_id: parseInt(ownerId) } }),
    //     deleteCompany: async (_, { id }) => await prisma.company.delete({ where: { id: parseInt(id) } }),

    //     createEmployee: async (_, { name, phone, salary, companyId, projectId }) => await prisma.employee.create({ data: { name, phone, salary, companyId: parseInt(companyId), projectId: parseInt(projectId) } }),
    //     updateEmployee: async (_, { id, name, phone, salary, companyId, projectId }) => await prisma.employee.update({ where: { id: parseInt(id) }, data: { name, phone, salary, companyId: parseInt(companyId), projectId: parseInt(projectId) } }),
    //     deleteEmployee: async (_, { id }) => await prisma.employee.delete({ where: { id: parseInt(id) } }),

    //     createProject: async (_, { name, type, estimatedAmount, companyId, employeeId }) => await prisma.project.create({ data: { name, type, estimatedAmount: parseInt(estimatedAmount), companyId: parseInt(companyId), employeeId: parseInt(employeeId) } }),
    // },
    // Owner: {
    //     companies: async (parent) => await prisma.company.findMany({ where: { owner_id: parent.id } })
    // },
    // Company: {
    //     owner: async (parent) => await prisma.owner.findUnique({ where: { id: parent.id } }),
    //     employees: async (parent) => await prisma.employee.findMany({ where: { companyId: parent.id } })
    // },

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
        }
        
        
    }
}

module.exports =  resolvers, prisma ;
