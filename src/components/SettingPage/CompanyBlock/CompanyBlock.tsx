import { FC } from "react"

import { useAppSelector } from "../../../store";

import { Stack, } from '@mui/material';

import CompName from "./CompName";
import CompBalance from "./CompBalance";
import CompLink from "./CompLink";

import { TCompanyData } from "../types/carsSettingsTypes";

interface TCompanyBlockProps {
  companyData?: TCompanyData
}

const CompanyBlock: FC<TCompanyBlockProps> = () => {

  const companyId = useAppSelector((store) => store.carsSettings.company.company_id)

  return (
    <Stack width={'100%'} display={'flex'}
      flexDirection={'row'} mb={'2rem'}
      justifyContent={'space-between'}
      gap={'1rem'}
      flexWrap={'wrap'}
    >
      {companyId &&
        <>
      {/* Block One */}
      {/* Имя компании */}
        <CompName key={'compBlock-name'}></CompName>
      {/* Block Two */}
      {/* Баланс */}
        <CompBalance key={'compBlock-balance'}></CompBalance>
      {/* Block Three */}
      {/* Короткая Ссылка */}
        <CompLink key={'compBlock-link'}></CompLink>
      </>
      }
    </Stack>
  )
}
export default CompanyBlock