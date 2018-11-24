#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>

using namespace eosio;

class [[eosio::contract]] poo : public eosio::contract {
  public:
      using contract::contract;

      poo(name receiver, name code,  datastream<const char*> ds):contract(receiver, code, ds) {}


      [[eosio::action]]
      void addrecord(uint64_t file_id, name user) {
        require_auth( user );
        files_table addresses(_code, _code.value);
        auto iterator = addresses.find(file_id);
        if( iterator == addresses.end() )
          {
            addresses.emplace(get_self(), [&]( auto& row ) {
              row.file_id = file_id;
              row.user = user;
              });
          }
      }

      [[eosio::action]]
      void updaterecord(uint64_t file_id, name user) {
              require_auth( user );
              files_table addresses(_code, _code.value);
              auto iterator = addresses.find(file_id);
              if( iterator != addresses.end() )
                {
                  addresses.modify(iterator, get_self(), [&]( auto& row ) {
                    row.file_id = file_id;
                    row.user = user;
                    });
                }
            }

  private:

    struct [[eosio::table]] file_info {

      uint64_t file_id;
      name user;


      uint64_t primary_key() const { return file_id; }
    };

        typedef eosio::multi_index<"files"_n, file_info> files_table;
};
EOSIO_DISPATCH( poo, (addrecord)(updaterecord))
