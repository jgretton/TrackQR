-- Create function to update scan count
CREATE OR REPLACE FUNCTION update_qr_scan_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE qr_codes 
  SET scan_count = scan_count + 1 
  WHERE id = NEW.qr_code_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_scan_count_trigger
  AFTER INSERT ON scans
  FOR EACH ROW
  EXECUTE FUNCTION update_qr_scan_count();

-- Backfill existing scan counts
UPDATE qr_codes 
SET scan_count = (
  SELECT COUNT(*) 
  FROM scans 
  WHERE scans.qr_code_id = qr_codes.id
);