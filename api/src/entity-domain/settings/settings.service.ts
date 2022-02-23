import { Injectable } from '@nestjs/common';
import { Bidbondperiod } from 'src/bidbondperiod/entities/bidbondperiod.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Currency } from 'src/currency/entities/currency.entity';
import { Noticetype } from 'src/noticetype/entities/noticetype.entity';
import { Procurementcategory } from 'src/procurementcategory/entities/procurementcategory.entity';
import { Procurementclassification } from 'src/procurementclassification/entities/procurementclassification.entity';
import { Section } from 'src/sections/entities/section.entity';
import { Uom } from 'src/uom/entities/uom.entity';

@Injectable()
export class SettingsService {

    async getNoticetypes(){
        return await Noticetype.find()
    }

    async getCurrency(){
        return await Currency.find()
    }

    async getUOM(){
        return await Uom.find()
    }

    async getProcurementcategory(){
        return await Procurementcategory.find()
    }

    async getProcuremmentclassification(){
        return await Procurementclassification.find()
    }

    async getNoticeSettings(){
         const categories = await Category.find({where:{status:'CREATED'}})

         const noticetypes = await Noticetype.find()

         const sections = await Section.find()

         const procurementcategories = await Procurementcategory.find()
         const currency = await Currency.find()

         const periods = await Bidbondperiod.find()

         return {categories:categories,currency:currency,periods:periods,noticetypes:noticetypes,sections:sections,procurementcategories:procurementcategories}
    }
}
