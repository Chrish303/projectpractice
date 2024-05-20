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

    Owner: {
        companies: async (parent) => {
            console.log(parent)
            try {
                return await prisma.company.findMany({
                    where: { owner_id: parent.id }
                });
            } catch (error) {
                console.error('Error fetching company details:', error);
                throw new Error('Failed to fetch company details');
            }
        }
    },
    Company:{
        owner:async(parent)=>{
            try{
                return await prisma.owner.findUnique({
                    where:{id:parent.id}
                })
            }catch(error){
                console.error('Error to owner detatils',error)
                throw new Error('Failed to owner detatils')
            }
        },
    },

    Company:{
        employees:async(parent)=>{
            try{
                return await prisma.employee.findMany({
                    where:{companyId:parent.id}
                })
            }catch(error){
                console.error('Error to get employees detatils')
                throw new Error('Failed to employees details')
            }
        },
        projects:async(parent)=>{
            try{
                return await prisma.project.findMany({
                    where:{ProjectId:parent.id}
                })
            }catch(error){
                console.error('Error to projects details',error)
                throw  new Error('Failed to projects details')
            }
        }
    },

    Employee:{
        company:async(parent)=>{
            console.log(parent)
            try{
                return await prisma.company.findUnique({
                    where:{id:parent.companyId}
                })
            }catch(error){
                console.error('Error to get company',error)
                throw new Error('Failed to get company details')
            }
        },
        project:async(parent)=>{
            try{
                return await prisma.project.findUnique({
                    where:{id:parent.projectId}
                })
            }catch(error){
                console.error('Error to get project details',error)
                throw new Error('Failed to get project details')
            }
        },
        projectManager:async(parent)=>{
            try{
                return await prisma.employee.findUnique({
                    where:{id:parent.projectManagerId}
                })
            }catch(error){
                conole.error('Error to project manager')
                throw new Error('Failed to project manger details')
            }
        }
    },

    Profile:{
        employee:async(parent)=>{
            try{
                return await prisma.employee.findUnique({
                    where:{id:parent.id}
                })
            }catch(error){
                console.error('Error to employee profile',error)
                throw new Error('Failed to employee profile')
            }
        }
    },

    Customer:{
        projects:async(parent)=>{
            try{
                return await prisma.project.findMany({
                    where:{customerId:parent.id}
                })
            }catch(error){
                console.error('Error to customer project',error)
                throw new Error('Failed to customer project')
            }
        },
        customerProfiles:async(parent)=>{
            try{
                return await prisma.customerProfile.findMany({
                    where:{id:parent.id}
                })
            }catch(error){
                console.error('Error to project customer profile',error)
                throw new Error('Failed to project customer profile')
            }
        }
    },

    // CustomerProfile:{
    //     customer:async(parent)=>{
    //         try{
    //             return await prisma.customer.findUnique({
    //                 where:{customerId:parent.id}
    //             })
    //         }catch(error){
    //             console.error('Error to customer profile details',error)
    //             throw new Error('Failed to customer profile details')
    //         }
    //     }
    // },

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
        updateEmployee:async(_,{id,name,phone,salary,companyId, projectId})=>{
            try{
                const updateEmployee = await prisma.employee.update({
                    where:{id:parseInt(id)},
                    data:{
                        name:name,
                        phone:phone,
                        salary:salary,
                        companyId:parseInt(companyId),
                        projectId:parseInt(projectId)
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
        },
        createProject:async(_,{ projectName, projectGroup,StartDate,DueDate,ProjectOwner,customerId,projectManagerId,projectAccountControllerId,companyId,projectType })=>{
            try{
                const createProject = await prisma.project.create({
                    data:{
                        projectName:projectName,
                        projectGroup:projectGroup,
                        StartDate:StartDate,
                        DueDate:DueDate,
                        ProjectOwner:ProjectOwner,
                        customerId:parseInt(customerId),
                        projectManagerId:parseInt(projectManagerId),
                        projectAccountControllerId:parseInt(projectAccountControllerId),
                        companyId:parseInt(companyId),
                        projectType:projectType
,                    },
                    
                });return createProject;
            }catch(error){
                console.error('Error to create project',error)
                throw new Error('Failed to create project')
            }
        },
        updateProject: async (_, { ProjectId, projectName, projectGroup, StartDate, DueDate, ProjectOwner, customerId, projectManagerId, projectAccountControllerId, companyId, projectType }) => {
            try {
                const updateProject = await prisma.project.update({
                    where: {
                        ProjectId: parseInt(ProjectId), // Correct casing to 'ProjectId'
                    },
                    data: {
                        projectName: projectName,
                        projectGroup: projectGroup,
                        StartDate: StartDate,
                        DueDate: DueDate,
                        ProjectOwner: ProjectOwner,
                        customerId: parseInt(customerId),
                        projectManagerId: parseInt(projectManagerId),
                        projectAccountControllerId: parseInt(projectAccountControllerId),
                        companyId: parseInt(companyId),
                        projectType: projectType
                    }
                });
                return updateProject;
            } catch (error) {
                console.error('Error updating project:', error);
                throw new Error('Failed to update project');
            }
        },
        deleteProject:async(_, { ProjectId})=>{
            try{
                const deleteProject = await prisma.project.delete({
                    where:{ ProjectId: parseInt(ProjectId)}
                });
                return deleteProject;
            }catch(error){
                console.error('Error to delete project',error)
                throw new Error('Failed to delete project')
            }
        }
        
    },     
}


module.exports =  resolvers, prisma ;
