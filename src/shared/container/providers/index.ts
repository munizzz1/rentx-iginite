import { container } from "tsyringe";

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";

container.register<IDateProvider>(
    'DayjsDateProvider',
    DayjsDateProvider
);