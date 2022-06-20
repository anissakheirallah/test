import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'home',
    title: 'MENU.HOME',
    type: 'item',
    icon: 'home',
    url: 'home'
  },
  {
    id: 'cvtech',
    title: 'MENU.cvtech',
    type: 'collapsible',
    icon: 'menu',

    children: [
      {
        id: 'dashboard',
        title: 'MENU.Dashboard',
        type: 'item',
        icon: 'monitor',
        url: 'cvtech/dashboard',
      },
      {
        id: 'cvs',
        title: 'MENU.CVs',
        type: 'item',
        icon: 'file',
        url: 'cvtech/cvs'
      },
      {
        id: 'campaign',
        title: 'MENU.CVTECH.APP',
        type: 'collapsible',
        icon: 'folder-plus',
        children:[
          {
            id: 'allcampaigns',
            title: 'MENU.CVTECH.ALLCAMPAIGNS',
            type: 'item',
            icon: 'list',
            url: 'cvtech/campaign/allcampaigns'
          },
          {
            id: 'addcampaign',
            title: 'MENU.CVTECH.ADDCAMPAIGN',
            type: 'item',
            icon: 'plus-square',
            url: 'cvtech/campaign/addcampaign'
          },
        ]
      },
      {
        id: 'candidats',
        title: 'MENU.CVTECH.CANDIDAT',
        type: 'collapsible',
        icon: 'users',
        children:[
          {
            id: 'allcandidats',
            title: 'MENU.CVTECH.ALLCANDIDATS',
            type: 'item',
            icon: 'list',
            url: 'cvtech/candidats/allcandidats'
          },
          {
            id: 'addcandidat',
            title: 'MENU.CVTECH.ADDCANDIDAT',
            type: 'item',
            icon: 'plus-square',
            url: 'cvtech/candidats/addcandidat'
          }
        ]
      },
      {
        id: 'profil',
        title: 'Profil',
        type: 'collapsible',
        icon: 'book',
        children:[
          {
            id: 'edu',
            title: 'Education',
            type: 'item',
            icon: 'file',
            url: 'cvtech/profile/education'
          },
          {
            id: 'ge',
            title: 'Global Exprience',
            type:'item',
            icon: 'file',
            url: 'cvtech/profile/experience'
          },
          {
            id: 'cs',
            title: 'Current Situation',
            type: 'item',
            icon: 'file',
            url: 'cvtech/profile/situation'
          },
          {
            id: 'skill',
            title: 'Skills',
            type: 'item',
            icon: 'file',
            url: 'cvtech/profile/skills'
          },
          {
            id: 'avail',
            title: 'Availabilty',
            type: 'item',
            icon: 'file',
            url: 'cvtech/profile/availabilty'
          },
          {
            id: 'func',
            title: 'Function',
            type: 'item',
            icon: 'file',
            url: 'cvtech/profile/function'
          }
        ]
      },
    ]

  },
  {
    id: 'companies',
    type: 'collapsible',
    title: 'MENU.COMPANY.APP',
    icon: 'menu',

    children: [
      {
        id: 'company',
        title: 'MENU.COMPANY.COMP',
        type: 'collapsible',
        icon: 'grid',

        children:[
          {
            id: 'allcompanies',
            title: 'MENU.COMPANY.ALLCOMPANIES',
            type: 'item',
            icon: 'list',
            url: 'companies/company/allcompanies'
          },
          {
            id: 'addcompany',
            title: 'MENU.COMPANY.ADDCOMPANY',
            type: 'item',
            icon: 'plus-square',
            url: 'companies/company/addcompany'
          },
        ]
      },
      {
        id: 'Companyentity',
        title: 'MENU.COMPANY.COMPANYENTITY',
        type: 'collapsible',
        icon: 'grid',
        children: [
          {
            id: 'Companyentity',
            title: 'MENU.COMPANY.ALLENTITIES',
            type: 'item',
            icon: 'list',
            url: 'companies/company-entity/allentities'
          },
          {
            id: 'Companyentity',
            title: 'MENU.COMPANY.ADDCOMPANYENTITY',
            type: 'item',
            icon: 'plus-square',
            url: 'companies/company-entity/addcompanyentity'
          }
        ]
      },
      {
        id: 'Department',
        title: 'MENU.COMPANY.DEPARTMENT',
        type: 'collapsible',
        icon: 'grid',
        children: [
          {
            id: 'adddepartment',
            title: 'MENU.COMPANY.ADDDEPARTMENT',
            type: 'item',
            icon: 'plus-square',
            url: 'companies/department/addDepartment'
          }
        ]
      }
    ]
  }



]
