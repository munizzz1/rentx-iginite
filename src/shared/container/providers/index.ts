import { container } from "tsyringe";

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";

import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { EtherealMailProvider } from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';

container.register<IDateProvider>(
    'DayjsDateProvider',
    DayjsDateProvider
);

container.registerInstance<IMailProvider>(
    'EtherealMailProvider',
    new EtherealMailProvider()
);