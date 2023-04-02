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

    //trova i post degli amici, i propri e di quelli che amano lo stesso personaggio
    public function getPosts(int $iduser){
        $query = "SELECT idpost, titolo, immaginepost, datapost, testo, nickname, idpersonaggio, anteprimapost
        FROM post inner join account on post.iduser=account.iduser left join amicizia a on a.idUser =post.idUser
        where post.idUser = ? or a.idAmico=? or account.IdPersonaggio = (SELECT IdPersonaggio from account where account.idUser = ?)
        ORDER BY datapost DESC";
        //if($n > 0){
        //    $query .= " LIMIT ?";
        //}
        $stmt = $this->db->prepare($query);
        //if($n > 0){
            $stmt->bind_param('iii',$iduser,$iduser,$iduser);
        //}
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }


    public function getPostsProfilo(int $iduser){
        $query = "SELECT idpost, titolo, immaginepost, datapost, testo, nickname, idpersonaggio, anteprimapost FROM post, account WHERE post.iduser=account.iduser and post.iduser =? ORDER BY datapost DESC";
   
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i',$iduser);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function insertPost($titolopost, $testopost, $datapost, $imgpost, $iduser){
    
        $query = "INSERT INTO post (titolo, testo, datapost, immaginepost, iduser) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssssi',$titolopost, $testopost, $datapost, $imgpost, $iduser);
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

    function getCommenti(int $idpost){
        $query = "select * from commento c inner join account a on c.idUser=a.idUser where idPost=? order by dataCommento DESC";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $idpost);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    
    function aggiungiCommento(int $idpost, string $iduser, string $commento){
        $query = "INSERT INTO commento (idpost, iduser, contenuto, dataCommento) VALUES (?, ?, ?, NOW())";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('iis', $idpost, $iduser, $commento);
        $result = $stmt->execute();
        return $result;
    }

    public function deletePostComment(int $commentID){
        $query = "DELETE FROM commento WHERE idCommento = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i',$commentID);
        $result=$stmt->execute();
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

    public function getUserAmici(int $iduser){
        $query = "SELECT ac.nickname, idpersonaggio FROM amicizia inner JOIN account ac ON amicizia.idamico = ac.iduser WHERE amicizia.iduser = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $iduser);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function trovaUtenti(string $nome_utente){
        $query = "SELECT a.nome, a.cognome, linkImmagine FROM account a inner join personaggi p on a.IdPersonaggio = p.idPersonaggio WHERE a.nome LIKE CONCAT('%', ?, '%')";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $nome_utente);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

}

?>