<?php
class DatabaseHelper{
    private $db;

    public function __construct($servername, $iduser, $password, $dbname, $port){
        $this->db = new mysqli($servername, $iduser, $password, $dbname, $port);
        if($this->db->connect_error){
            die("Connesione fallita al db");
        }
    }

    public function checkLogin(string $email, string $password)
    {
        $query = "SELECT iduser, nickname FROM account WHERE email = ? AND password = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $email, $password);
        $stmt->execute();
        $result = $stmt->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPersonaggi(){
        $stmt = $this->db->prepare("SELECT * FROM personaggi");
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }
   
    public function cercaAccountByNickname($nickname){
        $query = "SELECT nickname FROM ACCOUNT WHERE nickname = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$nickname);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function insertAccount(string $email, string $nome, string $cognome,string $data_nascita, int  $telefono, string $nickname, string $password, int $personaggio) : bool{
        $query ="INSERT INTO ACCOUNT (email,nome,cognome,datanascita,telefono,nickname, password, idpersonaggio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssssissi', $email, $nome, $cognome, $data_nascita, $telefono, $nickname, $password, $personaggio);
        return $stmt->execute();
    }

    public function getPosts($n=-1){
        $query = "SELECT idpost, titolo, immaginepost, datapost, testo, nickname FROM post, account WHERE post.iduser=account.iduser ORDER BY datapost DESC";
        if($n > 0){
            $query .= " LIMIT ?";
        }
        $stmt = $this->db->prepare($query);
        if($n > 0){
            $stmt->bind_param('i',$n);
        }
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function insertPost($titolopost, $testopost, $anteprimapost, $datapost, $imgpost, $iduser){
    
        $query = "INSERT INTO post (titolo, testo, anteprimapost, datapost, immaginepost, iduser) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sssssi',$titolopost, $testopost, $anteprimapost, $datapost, $imgpost, $iduser);
        $stmt->execute();
        
        return $stmt->insert_id;
    }

    public function countReactions(int $idpost){
        $query = "SELECT count(*) as numero FROM mipiace WHERE idpost = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $idpost);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

        return $result["0"]["numero"];
    }

    function checkReaction(int $idpost, string $iduser){
        $query = "SELECT mipiace FROM mipiace WHERE idpost = ? AND iduser = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii', $idpost, $iduser);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    function updateLike(int $likeValue, int $idpost, string $iduser){
        $query = "UPDATE mipiace SET mipiace = ? WHERE idpost = ? AND iduser = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('iii', $likeValue, $idpost, $iduser);
        $result = $stmt->execute();
        return $result;
    }

    function insertLike(int $idpost, string $iduser, int $likeValue){
        $query = "INSERT INTO mipiace (idpost, iduser, mipiace) VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('iii', $idpost, $iduser, $likeValue);
        $result = $stmt->execute();
        return $result;
    }

    function removeLike(int $idpost, string $iduser){
        $query = "DELETE FROM mipiace WHERE idpost = ? AND iduser = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii', $idpost, $iduser);
        $result = $stmt->execute();
        return $result;
    }

    public function getUserProfilo(string $iduser){
        $query = "SELECT account.nome, cognome, nickname, account.idpersonaggio, email, p.nome as personaggio_preferito FROM account inner join personaggi p on p.idPersonaggio = account.IdPersonaggio WHERE iduser = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $iduser);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_assoc();
    }

    public function getUserAmici($iduser){
        $query = "SELECT ac.nickname, idpersonaggio FROM amicizia inner JOIN account ac ON amicizia.idamico = ac.iduser WHERE amicizia.iduser = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $iduser);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

}

?>