import { E } from '@agoric/eventual-send';
import { makeZoe } from '@agoric/zoe';
import { makeIssuerKit } from '@agoric/ertp';
import { makeFakeChain } from '@agoric/zoe/tools/fakeChain';

import { start } from '../scripts/src/healthRecords.js';

async function deploy() {
  try {
    console.log('Hello from deploy')
    // Create Zoe instance
    const zoe = makeZoe(makeFakeChain());
    
    // Install the contract
    const bundle = await E(zoe).install(start);
    
    // Start the contract instance
    const { publicFacet } = await E(zoe).startInstance(bundle);
    
    // Test the contract to ensure it's working
    await E(publicFacet).addOrUpdateRecord('test-patient-1', {
      name: 'Test Patient',
      age: 30,
      condition: 'Healthy'
    });
    
    const testRecord = await E(publicFacet).getRecord('test-patient-1');
    console.log('Test record retrieved:', testRecord);
    
    console.log('Contract deployed and tested successfully!');
    console.log('Contract Bundle:', bundle);
    console.log('Public Facet:', publicFacet);
    
    return { bundle, publicFacet };
  } catch (error) {
    console.error('Deployment error:', error.message);
    console.error('Stack trace:', error.stack);
    throw error;
  }
}

// Execute deployment with proper error handling
deploy()
  .then(({ bundle, publicFacet }) => {
    console.log('Deployment completed successfully');
  })
  .catch((error) => {
    console.error('Fatal deployment error:', error);
    process.exit(1);
  });