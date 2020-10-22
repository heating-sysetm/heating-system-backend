-- CREATE A FUNCTION TRIGGER
CREATE OR REPLACE FUNCTION gaz_trigger() RETURNS trigger AS $$
DECLARE
BEGIN
  PERFORM pg_gaz('watchers', 
    '{' ||
      '"table":"'    || TG_TABLE_NAME || '",' ||
      '"operation":"'|| TG_OP         || '",' ||
      '"row":'       || (select row_to_json(row)::varchar from (SELECT NEW.*) row) ||
    '}'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- CREATE A TRIGGER
CREATE TRIGGER watched_table_trigger AFTER INSERT OR UPDATE OR DELETE ON TRUNCATE 
  -- TABLE
  TEST_GAZ
FOR EACH ROW EXECUTE PROCEDURE gaz_trigger();



-- CREATE A FUNCTION TRIGGER
CREATE OR REPLACE FUNCTION temperature_trigger() RETURNS trigger AS $$
DECLARE
BEGIN
  PERFORM pg_temperature('watchers', 
    '{' ||
      '"table":"'    || TG_TABLE_NAME || '",' ||
      '"operation":"'|| TG_OP         || '",' ||
      '"row":'       || (select row_to_json(row)::varchar from (SELECT NEW.*) row) ||
    '}'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- CREATE A TRIGGER
CREATE TRIGGER watched_table_trigger AFTER INSERT OR UPDATE OR DELETE ON TRUNCATE 
  -- TABLE
  TEST_TEMPERATURE
FOR EACH ROW EXECUTE PROCEDURE temperature_trigger();