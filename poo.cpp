#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <eosiolib/asset.hpp>

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

      [[eosio::action]]
      void transrecord(uint64_t file_id, name from, name to, asset quantity) {
              require_auth( from );
              files_table addresses(_code, _code.value);
//              pay_token(from, to, quantity);

              auto iterator = addresses.find(file_id);
              if( iterator != addresses.end() )
                              {
                                addresses.modify(iterator, get_self(), [&]( auto& row ) {
                                  row.file_id = file_id;
                                  row.user = from;
                                  });
                              }

            }

  private:

    struct [[eosio::table]] file_info {

      uint64_t file_id;
      name user;


      uint64_t primary_key() const { return file_id; }
    };

    void pay_token(name from, name to, asset quantity) {

        action pay = action(
          permission_level{from,"active"_n},
          "eosio.token"_n,
          "transfer"_n,
          std::make_tuple(from, to, quantity, std::string("test"))
        );

        pay.send();
      }


        typedef eosio::multi_index<"files"_n, file_info> files_table;
};
EOSIO_DISPATCH( poo, (addrecord)(transrecord))
