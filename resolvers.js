const { PrismaClient } = require('@prisma/client');
const { parse } = require('graphql');
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
                return await prisma.employee.findMany()
            }catch(error){
                console.error('Error to fetch employee',error)
                throw new Error('Failed to fetch employee')
            }
        },
        employee:async(_,{id})=>{
            try{
                return await prisma.employee.findUnique({
                    where:{id:parseInt(id)}
                })
            }catch(error){
                console.error('Error to find employee',error)
                throw new Error('Failed to find employee')
            }
        },
        // fetch the Profil
        profiles:async()=>{
            try{
                return await prisma.profile.findMany()
            }catch(error){
                console.error('Error to fetch profile',error)
                throw new Error('Failed to  fetch profile')
            }
        },
        profile:async(_,{ id })=>{
            try{
                return await prisma.profile.findUnique({
                    where:{
                        id:parseInt(id)
                    }
                })
            }catch(error){
                console.error('Error to fetch profile',error)
                throw new Error('Failed to  fetch profile')
            }
        },
        // FETCH the Customer
        customers:async()=>{
            try{
                return await prisma.customer.findMany();
            }catch(error){
                console.error('Error to fetch customers',error)
                throw new Error('Failrd to fetch customers')
            }
        },
        customer:async(_,{ id })=>{
            try{
                return await prisma.customer.findUnique({
                    where:{ id : parseInt(id)}
                });
            }catch(error){
                console.error('Error to fetch customers',error)
                throw new Error('Failrd to fetch customers')
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
        createEmployee:async(_,{ name,phone,salary,companyId,projectId})=>{
            try{
                const createEmployee = await prisma.employee.create({
                    data:{
                        name:name,
                        phone:phone,
                        salary:salary,
                        companyId:parseInt(companyId),
                        projectId:parseInt(projectId)
                    }
                });
                return createEmployee;
            }catch(error){
                console.error('Error to crate employee',error)
                throw new Error('Failed to create employee')
            }
        },
        updateEmployee:async(_,{id,name,phone,salary,companyId})=>{
            try{
                const updateEmployee = await prisma.employee.update({
                    where:{id:parseInt(id)},
                    data:{
                        name:name,
                        phone:phone,
                        salary:salary,
                        companyId:parseInt(companyId),
                    }
                });
                return updateEmployee
            }catch(error){
                console.error('Error to update employeee',error)
                throw new Error('Failed to update employee')
            }
        },
        deleteEmployee:async(_,{ id })=>{
            try{
                const deleteEmployee = await prisma.employee.delete({
                    where:{
                        id:parseInt(id)
                    }
                });
                return deleteEmployee
            }catch(error){
                console.error('Error to delete employee',error)
                throw new Error('Failed to delete employee')
            }
        },
        createProfile:async(_,{ image, email, emergencyContact, bloodGroup, dateOfBirth, employeeId })=>{
            try{
                const createProfile = await prisma.profile.create({
                    data:{
                        image:image,
                        email:email,
                        emergencyContact,
                        bloodGroup:bloodGroup,
                        dateOfBirth:dateOfBirth,
                        employeeId:parseInt(employeeId)
                    }
                });return createProfile
            }catch(error){
                console.error('Error to create profile',error);
                throw new Error('Failed to create profile')
            }
        },
        updateProfile:async(_,{ id,image, email, emergencyContact, bloodGroup, dateOfBirth, employeeId })=>{
            try{
                const updateProfile = await prisma.profile.update({
                    where:{
                        id:parseInt(id)
                    },
                    data:{
                        image:image,
                        email:email,
                        emergencyContact,
                        bloodGroup:bloodGroup,
                        dateOfBirth:dateOfBirth,
                        employeeId:parseInt(employeeId) 
                    }
                });return updateProfile
            }catch(error){
                console.error('Error to update profile',error)
                throw new Error('Failed to update profile')
            }
        },
        deleteProfile:async(_,{ id })=>{
            try{
                const deleteProfile = await prisma.profile.delete({
                    where:{
                        id:parseInt(id)
                    }
                });return deleteProfile
            }catch(error){
                console.error('Error to delete profile',error)
                throw new Error('Failed todelete profile')
            }
        },
        createCustomer:async(_,{ CustomerName })=>{
            try{
                const createCustomer = await prisma.customer.create({
                    data:{
                        CustomerName:CustomerName
                    }
                });return createCustomer
            }catch(error){
                console.error('Error to create customer',error);
                throw new Error('Failed to create customer')
            }
        },
        updateCustomer:async(_, { id, CustomerName })=>{
            try{
                const updateCustomer = await prisma.customer.update({
                    where:{ id:parseInt(id)},
                    data:{
                        CustomerName:CustomerName
                    }
                });return updateCustomer
            }catch(error){
                console.error('Error to update customer',error)
                throw new Error('Failed to update customer')
            }
        },
        deleteCustomer:async(_,{ id })=>{
            try{
                const deleteCustomer = await prisma.customer.delete({
                    where:{ id : parseInt(id)}
                });return deleteCustomer;
            }catch(error){
                console.error('Error to delete customer',error)
                throw new Error('Failed to delete customer')
            }
        },
        createCustomerProfile:async(_,{ companyName,email, phone, address, pincode, fax, website, customerId})=>{
            try{
                const createCustomerProfile = await prisma.customerProfile.create({
                    data:{
                        companyName:companyName,
                        email:email,
                        phone:phone,
                        address:address,
                        pincode:pincode,
                        fax:fax,
                        website:website,
                        customerId:parseInt(customerId)
            
                    }
                });return createCustomerProfile
            }catch(error){
                console.error('Error to create customer profile',error)
                throw new Error('Failed to create customer profile')
            }
        },
        updateCustomerProfile:async(_,{ id, companyName,email, phone, address, pincode, fax, website, customerId })=>{
            try{
                const updateCustomerProfile = await prisma.customerProfile.update({
                    where:{ id : parseInt(id)},
                    data:{
                        companyName:companyName,
                        email:email,
                        phone:phone,
                        address:address,
                        pincode:pincode,
                        fax:fax,
                        website:website,
                        customerId:parseInt(customerId)
                    }
                });return updateCustomerProfile;
            }catch(error){
                console.error('Error to update customer profile',error)
                throw new Error('Failed to update customer profile')
            }
        },
        deleteCustomerProfile:async(_,{ id })=>{
            try{
                const deleteCustomerProfile = await prisma.customerProfile.delete({
                    where:{ id : parseInt(id)}
                }); return deleteCustomerProfile
            }catch(error){
                console.error('Error to delete customer profile',error)
                throw new Error('Failed to delete customer profile')
            }
        }
    },          
}


module.exports =  resolvers, prisma ;
