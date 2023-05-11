import * as crypto from 'crypto';

export const hashPwd = (p: string) => {
  const hmac = crypto.createHmac(
    'sha512',
    'sól-im dłuższe tym lepsZe -jkalsmvi13jrniom;.;;.,<><><><><><_+_++_+(_+|!@#$%^&*())(*&^#@#^*%#$%@$%^&^%&*^%&(%&%(%^$%^#%*^$^$*($%^&(*))()(*&$@#$@!@#$$%RTFTYRFTYHTR^IUGyfukygfty',
  );
  hmac.update(p);
  return hmac.digest('hex');
};
