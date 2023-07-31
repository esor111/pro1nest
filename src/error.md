Error: Nest cannot export a provider/module that is not a part of the currently processed module (BusinessModule). Please verify whether the exported BusinessUserRepository is available in this particular context.

Possible Solutions:
- Is BusinessUserRepository part of the relevant providers/imports within BusinessModule?


SOLUTION :
PROVIDER MA PANI BusinessUserRepository RAKNE
  providers: [BusinessService,JwtStrategy, BusinessUserRepository],