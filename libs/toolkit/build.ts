// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as path from 'path';
import { ngPackagr } from 'ng-packagr';

ngPackagr()
  .forProject(path.resolve(__dirname, 'package.json'))
  .withTsConfig(path.resolve(__dirname, 'tsconfig-custom.json'))
  .build();
